import { createServer, type Server as MirageServer } from 'miragejs'
import { endpoints } from './endpoints'
import { models } from './models'
import { factories } from './factories'

export function mockServer (environment = 'development'): MirageServer {
  const server = createServer({
    environment,
    models,
    factories,
    fixtures: {},
    seeds (server) {
      server.loadFixtures()
    }
  })

  server.logging = true

  // // externals URLS
  // server.post(`${import.meta.env.VITE_API_BASE_URL ?? ''}/:any`,
  //   async () => await Promise.resolve((_res: any) => {})
  // )

  // internal URLS
  server.urlPrefix = import.meta.env.VITE_API_BASE_URL ?? ''

  for (const namespace of Object.keys(endpoints)) {
    // @ts-expect-error ignore type
    endpoints[namespace](server)
  }

  // Reset for everything else
  server.namespace = ''

  // server.timing = 5000

  server.passthrough()
  server.db.dump()

  return server
}

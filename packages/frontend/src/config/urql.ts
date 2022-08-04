import { createClient, dedupExchange, cacheExchange, fetchExchange } from 'urql'

export const client = createClient({
  url: '<@todo: change this>',
  // - dedupExchange: deduplicates requests if we send the same queries twice
  // - cacheExchange: implements the default "document caching" behaviour
  // - fetchExchange: send our requests to the GraphQL API
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
})

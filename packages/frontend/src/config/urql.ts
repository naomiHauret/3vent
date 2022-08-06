import { createClient, dedupExchange, cacheExchange, fetchExchange } from '@urql/core'

export const client = createClient({
  url: 'https://api.thegraph.com/subgraphs/name/naomihauret/find3vent',
  // - dedupExchange: deduplicates requests if we send the same queries twice
  // - cacheExchange: implements the default "document caching" behaviour
  // - fetchExchange: send our requests to the GraphQL API
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
})

# Subgraph
Subgraph for our smartcontracts live here.

To initialize a subgraph using The Graph hosted service, run `graph init --product hosted-service <GITHUB_USER>/<SUBGRAPH NAME>` in this folder.

## Structure
```
subgraph-name
└───abis
│   │  {Name}.json
└───generated
│   └───{Name}
│       │   {Name}.ts
│   │   schema.ts
│   networks.json
│   package.json
│   schema.graphql
└───src
│  │   {Name}.ts
│   subgraph.yaml
│   tsconfig.json
```

- `schema.graphql`:  Where we define the schema for our GraphQL queries. The data model should match the data queried on the front-end.
- `subgraph.yaml`: The subgraph manifest. Use this file to define the settings for the subgraph.
- `/src/{Name}.ts`: Mappings files. Responsible for the logic that happens in-between an event firing from our smart contract and that data being organized into our schema.


## Deployment
To deploy to the The Graph hosted service :

```
graph build 
graph auth --product hosted-service <ACCESS_TOKEN>
graph deploy --product hosted-service <GITHUB_USER>/<SUBGRAPH NAME>
```

## Updating a subgraph
Upon changes on your smart contract and after you re-deployed it, you can update your subgraph easily by: 

1. Update the contract address in `subgraph.yaml`
2. Copy/paste the new ABI in the `/abis`
3. If you made any changes to the schema or emitted events from your contract, make sure to generate new types using `graph codegen`.
4. Deploy your updated subgraph with `graph build && graph deploy --product hosted-service <GITHUB_USER>/<SUBGRAPH NAME>`

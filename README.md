# 3vent- 30 Days of Web3 pet project

3vent is a full-stack RSVP dapp built during [30 Days of Web3](https://www.30daysofweb3.xyz/) curriculum.

## Overview
> An Eventbrite like platform. Attendees will deposit ETH to RSVP and will get it back upon them checking in at the event.

---
## Project structure

3vent is a monorepo. You will find the following packages :

`packages/smartcontracts`: Hardhat + Solidity smartcontract
`packages/subgraphs`: Subgraphs
`packages/frontend`: Front-end application. 

Each of the packages have their own package.json file, so they define their dependencies.

```
|- package.json => root workspace
|--- packages
|
|------ frontend
|---------- package.json  => front-end app
|
|------ smartcontracts
|---------- package.json => Hardhat + Solidity project
|
|------ subgraphs
|---------- package.json  => Subgraphs
```
### How to install
> Pre-requisite: use LTS node version, have pnpm installed.

- Clone this repository locally
- Install the dependencies with `pnpm install`

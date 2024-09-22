# Rocketseat Fastify REST API

## How to run

1. run `nvm use` (or install the version set on .nvmrc)
2. run `npm i`
3. run `npm run knex -- migrate:latest`
4. run `npm run dev`

## Requisites:

### RF

- [x] User can create a new transaction
- [x] User can obtain his account info
- [x] User can list all past transactions
- [x] User must be able to visualize a single transaction

### RN

- [x] Transaction can be of credit type which will sum to the total value
- [x] Transaction can be of debit type which will subtract from the total value
- [x] It must be possible to identify users between the requests
- [x] User can only visualize transactions he created

## Tools:

- HTTP Server

  - [Fastify](https://fastify.dev/) - a web framework highly focused on providing the best developer experience with the least overhead and a powerful plugin architecture

- Database

  - [Knex.js](https://knexjs.org/) - is a "batteries included" SQL query builder for PostgreSQL, CockroachDB, MSSQL, MySQL, MariaDB, SQLite3, Better-SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use.
  - [Sqlite3](https://github.com/kriasoft/node-sqlite?tab=readme-ov-file#install-sqlite3) - a wrapper library written in Typescript with ZERO dependencies that adds ES6 promises and SQL-based migrations API to sqlite3.

- Schemas validations

  - [Zod](https://zod.dev/) - TypeScript-first schema validation with static type inference

- Tests

  - [Vitest](https://vitest.dev/guide/) - a next generation testing framework powered by Vite
  - [Supertest](https://github.com/ladjs/supertest) - a high-level abstraction for testing HTTP, while still allowing you to drop down to the lower-level API provided by superagent.

- Compile & Bundle

  - [TSX](https://tsx.is/) - tsx stands for TypeScript Execute and it's a Node.js enhancement to run TypeScript.
  - [TSUP](https://tsup.egoist.dev/) - bundle your TypeScript library with no config, powered by esbuild.

- Deploy

  - [Render](https://render.com/) - is a unified cloud to build and run all your apps and websites with free TLS certificates, global CDN, private networks and auto deploys from Git.

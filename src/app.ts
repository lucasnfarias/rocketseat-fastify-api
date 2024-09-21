import fastifyCookie from '@fastify/cookie'
import fastify from 'fastify'
import { transactionRoutes } from './routes/transactions'

export const app = fastify()

app.register(fastifyCookie)

app.addHook('preHandler', async (request) => {
  console.log(`[${request.method}] ${request.url}`)
})

app.register(transactionRoutes, {
  prefix: 'transactions',
})

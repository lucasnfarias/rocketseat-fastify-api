import { app } from './app'
import { env } from './env'

const host = 'RENDER' in process.env ? '0.0.0.0' : 'localhost'
const port = env.PORT

app
  .listen({
    host,
    port,
  })
  .then(() => {
    console.log(`HTTP server running on ${host}:${port}...`)
  })

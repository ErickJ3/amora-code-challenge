import Fastify from 'fastify'
import { registerRoutes } from './routes'

console.log(process.env.DATABASE_URL)

async function start() {
  const fastify = Fastify({ logger: true })

  await fastify.register(import('@fastify/cors'), {
    origin: [
      process.env.CLIENT_ORIGIN || 'http://localhost:3000',
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    maxAge: 86400,
  })

  await fastify.register(registerRoutes)

  fastify.setErrorHandler((error, request, reply) => {
    fastify.log.error(error)
    reply.status(500).send({
      error: 'Something went wrong',
      code: 'INTERNAL_ERROR',
    })
  })

  fastify.get('/health', async (request, reply) => {
    return { status: 'ok', timestamp: new Date().toISOString() }
  })

  try {
    await fastify.listen({ port: 4000, host: '0.0.0.0' })
    console.log('Server running on port 4000')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()

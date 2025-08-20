import type { FastifyInstance } from 'fastify'
import { authHandler } from '../handlers/auth'

export async function authRoutes(fastify: FastifyInstance) {
  fastify.route({
    method: ['GET', 'POST'],
    url: '/api/auth/*',
    handler: authHandler,
  })
}

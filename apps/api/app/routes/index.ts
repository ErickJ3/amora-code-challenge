import type { FastifyInstance } from 'fastify'
import { authRoutes } from './auth'
import { simulationRoutes } from './simulation'

export async function registerRoutes(fastify: FastifyInstance) {
  fastify.addHook('onRoute', (routeOptions) => {
    const methods = Array.isArray(routeOptions.method)
      ? routeOptions.method.join('|')
      : routeOptions.method

    console.log(`Route: ${methods} ${routeOptions.url}`)
  })

  await fastify.register(authRoutes)
  await fastify.register(simulationRoutes)
}

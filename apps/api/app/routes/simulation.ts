import type { FastifyInstance } from 'fastify'
import {
  createSimulationHandler,
  getSimulationsHandler,
  getSimulationHandler,
  updateSimulationHandler,
  deleteSimulationHandler,
} from '../handlers/simulation'

export async function simulationRoutes(fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/simulations',
    handler: createSimulationHandler,
  })
  fastify.route({
    method: 'GET',
    url: '/simulations',
    handler: getSimulationsHandler,
  })
  fastify.route({
    method: 'GET',
    url: '/simulations/:id',
    handler: getSimulationHandler,
  })
  fastify.route({
    method: 'PUT',
    url: '/simulations/:id',
    handler: updateSimulationHandler,
  })
  fastify.route({
    method: 'DELETE',
    url: '/simulations/:id',
    handler: deleteSimulationHandler,
  })
}

import type { FastifyReply, FastifyRequest } from 'fastify'
import { db } from '../database/db'
import {
  simulation,
  type NewSimulation,
  type Simulation,
} from '../database/schema'
import { auth } from '../lib/auth'
import { and, eq } from 'drizzle-orm'

export interface UserSession {
  user: {
    id: string
    email?: string
    name?: string
  }
}

export interface ErrorResponse {
  error: string
}

export interface SuccessResponse {
  message: string
}

export type CreateSimulationRequest = Omit<
  NewSimulation,
  'id' | 'userId' | 'createdAt' | 'updatedAt'
>

export type UpdateSimulationRequest = Partial<CreateSimulationRequest>

export interface SimulationParams {
  id: string
}

export interface CreateSimulationResponse {
  id: string
}

export interface GetSimulationsResponse {
  simulations: Simulation[]
}

export type SimulationResponse = Simulation
export type UpdateSimulationResponse = SuccessResponse
export type DeleteSimulationResponse = SuccessResponse

export async function createSimulationHandler(
  request: FastifyRequest<{ Body: CreateSimulationRequest }>,
  reply: FastifyReply,
) {
  try {
    const session = (await auth.api.getSession({
      // biome-ignore lint/suspicious/noExplicitAny: <>
      headers: request.headers as any,
    })) as UserSession | null

    if (!session?.user) {
      return reply
        .status(401)
        .send({ error: 'User not found!' } as ErrorResponse)
    }

    const [newSimulation] = await db
      .insert(simulation)
      .values({
        userId: session.user.id,
        ...request.body,
      })
      .returning()

    return reply
      .status(201)
      .send({ id: newSimulation?.id } as CreateSimulationResponse)
  } catch (error) {
    console.log('Error to create simulation: ', error)
    return reply
      .status(500)
      .send({ error: 'Internal server error' } as ErrorResponse)
  }
}

export async function getSimulationsHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const session = (await auth.api.getSession({
      // biome-ignore lint/suspicious/noExplicitAny: <>
      headers: request.headers as any,
    })) as UserSession | null

    if (!session?.user) {
      return reply
        .status(401)
        .send({ error: 'User not found!' } as ErrorResponse)
    }

    const userSimulations = await db
      .select()
      .from(simulation)
      .where(eq(simulation.userId, session.user.id))
      .orderBy(simulation.createdAt)

    return reply
      .status(200)
      .send({ simulations: userSimulations } as GetSimulationsResponse)
  } catch (error) {
    console.log('Error to get simulations: ', error)
    return reply
      .status(500)
      .send({ error: 'Internal server error' } as ErrorResponse)
  }
}

export async function getSimulationHandler(
  request: FastifyRequest<{ Params: SimulationParams }>,
  reply: FastifyReply,
) {
  try {
    const session = (await auth.api.getSession({
      // biome-ignore lint/suspicious/noExplicitAny: <>
      headers: request.headers as any,
    })) as UserSession | null

    if (!session?.user) {
      return reply
        .status(401)
        .send({ error: 'User not found!' } as ErrorResponse)
    }

    const { id } = request.params

    const [userSimulation] = await db
      .select()
      .from(simulation)
      .where(and(eq(simulation.id, id), eq(simulation.userId, session.user.id)))

    if (!userSimulation) {
      return reply
        .status(404)
        .send({ error: 'Simulation not found' } as ErrorResponse)
    }

    return reply.status(200).send(userSimulation as SimulationResponse)
  } catch (error) {
    console.log('Error to get simulation: ', error)
    return reply
      .status(500)
      .send({ error: 'Internal server error' } as ErrorResponse)
  }
}

export async function updateSimulationHandler(
  request: FastifyRequest<{
    Params: SimulationParams
    Body: UpdateSimulationRequest
  }>,
  reply: FastifyReply,
) {
  try {
    const session = (await auth.api.getSession({
      // biome-ignore lint/suspicious/noExplicitAny: <>
      headers: request.headers as any,
    })) as UserSession | null

    if (!session?.user) {
      return reply
        .status(401)
        .send({ error: 'User not found!' } as ErrorResponse)
    }

    const { id } = request.params

    const [existingSimulation] = await db
      .select()
      .from(simulation)
      .where(and(eq(simulation.id, id), eq(simulation.userId, session.user.id)))

    if (!existingSimulation) {
      return reply
        .status(404)
        .send({ error: 'Simulation not found' } as ErrorResponse)
    }

    await db
      .update(simulation)
      .set({
        ...request.body,
        updatedAt: new Date(),
      })
      .where(and(eq(simulation.id, id), eq(simulation.userId, session.user.id)))

    return reply.status(200).send({
      message: 'Simulation update with success',
    } as UpdateSimulationResponse)
  } catch (error) {
    console.log('Error to update simulation: ', error)
    return reply
      .status(500)
      .send({ error: 'Internal server error' } as ErrorResponse)
  }
}

export async function deleteSimulationHandler(
  request: FastifyRequest<{ Params: SimulationParams }>,
  reply: FastifyReply,
) {
  try {
    const session = (await auth.api.getSession({
      // biome-ignore lint/suspicious/noExplicitAny: <>
      headers: request.headers as any,
    })) as UserSession | null

    if (!session?.user) {
      return reply
        .status(401)
        .send({ error: 'User not found!' } as ErrorResponse)
    }

    const { id } = request.params

    const [existingSimulation] = await db
      .select()
      .from(simulation)
      .where(and(eq(simulation.id, id), eq(simulation.userId, session.user.id)))

    if (!existingSimulation) {
      return reply
        .status(404)
        .send({ error: 'Simulation not found' } as ErrorResponse)
    }

    await db
      .delete(simulation)
      .where(and(eq(simulation.id, id), eq(simulation.userId, session.user.id)))

    return reply.status(200).send({
      message: 'Simulation deleted',
    } as DeleteSimulationResponse)
  } catch (error) {
    console.log('Error to delete simulation: ', error)
    return reply
      .status(500)
      .send({ error: 'Internal server error' } as ErrorResponse)
  }
}

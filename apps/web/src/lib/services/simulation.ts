import { api } from '../api'

export interface CreateSimulationPayload {
  title: string
  propertyValue: number
  downPaymentPercentage: number
  contractYears: number
  annualInterestRate: number
  monthlyGrossIncome: number | null
  monthlyExpenses: number | null
  downPaymentAmount: number
  financedAmount: number
  totalToSave: number
  monthlySavingsAmount: number
  monthlyInstallment: number
  incomeCommitmentPercentage: number | null
}

export interface CreateSimulationResponse {
  id: string
}

export interface Simulation {
  id: string
  userId: string
  title: string
  propertyValue: number
  downPaymentPercentage: number
  contractYears: number
  annualInterestRate: number
  monthlyGrossIncome: number | null
  monthlyExpenses: number | null
  downPaymentAmount: number
  financedAmount: number
  totalToSave: number
  monthlySavingsAmount: number
  monthlyInstallment: number | null
  incomeCommitmentPercentage: number | null
  createdAt: Date
  updatedAt: Date
}

export interface GetSimulationsResponse {
  simulations: Simulation[]
}

export const simulationsApi = {
  create: async (
    payload: CreateSimulationPayload,
  ): Promise<CreateSimulationResponse> => {
    const { data } = await api.post('/simulations', payload)
    return data
  },

  getAll: async (): Promise<GetSimulationsResponse> => {
    const { data } = await api.get('/simulations')
    return data
  },

  getById: async (id: string): Promise<Simulation> => {
    const { data } = await api.get(`/simulations/${id}`)
    return data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/simulations/${id}`)
  },
}

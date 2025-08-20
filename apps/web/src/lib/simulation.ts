import { z } from 'zod'

export const simulationSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  propertyValue: z.number().min(1, 'Valor do imóvel deve ser maior que zero'),
  downPaymentPercentage: z.number().min(0).max(100),
  contractYears: z.number().min(1).max(50),
  annualInterestRate: z.number().min(0).max(50),
  monthlyGrossIncome: z.number().optional(),
  monthlyExpenses: z.number().optional(),
})

export type SimulationForm = z.infer<typeof simulationSchema>

export interface CalculationResults {
  downPaymentAmount: number
  financedAmount: number
  totalToSave: number
  monthlySavingsAmount: number
  monthlyInstallment: number
  incomeCommitmentPercentage?: number
  availableIncome?: number
}

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)

export const formatPercentage = (value: number): string =>
  new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(value / 100)

export const calculateSimulation = (
  values: SimulationForm,
): CalculationResults | null => {
  const {
    propertyValue,
    downPaymentPercentage,
    contractYears,
    annualInterestRate,
    monthlyGrossIncome,
    monthlyExpenses,
  } = values

  if (!propertyValue || propertyValue <= 0) {
    return null
  }

  const downPayment = downPaymentPercentage ?? 20
  const years = contractYears ?? 30
  const rate = annualInterestRate ?? 10.5

  const downPaymentAmount = propertyValue * (downPayment / 100)
  const financedAmount = propertyValue - downPaymentAmount
  const totalToSave = propertyValue * 0.15
  const monthlySavingsAmount = totalToSave / (years * 12)
  const monthlyRate = rate / 100 / 12
  const totalMonths = years * 12
  let monthlyInstallment = 0

  if (monthlyRate > 0 && financedAmount > 0) {
    const factor = Math.pow(1 + monthlyRate, totalMonths)
    monthlyInstallment = (financedAmount * monthlyRate * factor) / (factor - 1)
  } else if (financedAmount > 0) {
    monthlyInstallment = financedAmount / totalMonths
  }

  let incomeCommitmentPercentage: number | undefined
  let availableIncome: number | undefined

  if (monthlyGrossIncome && monthlyGrossIncome > 0) {
    incomeCommitmentPercentage = (monthlyInstallment / monthlyGrossIncome) * 100
    availableIncome =
      monthlyGrossIncome - (monthlyExpenses || 0) - monthlyInstallment
  }

  return {
    downPaymentAmount,
    financedAmount,
    totalToSave,
    monthlySavingsAmount,
    monthlyInstallment,
    incomeCommitmentPercentage,
    availableIncome,
  }
}

export const getIncomeStatus = (percentage?: number) => {
  if (!percentage) return null

  if (percentage <= 30) {
    return { status: 'excellent' as const, message: 'Comprometimento ideal' }
  } else if (percentage <= 40) {
    return { status: 'good' as const, message: 'Comprometimento moderado' }
  } else {
    return { status: 'high' as const, message: 'Comprometimento alto' }
  }
}

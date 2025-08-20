import { z } from 'zod'

export const simulationSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  propertyValue: z.number().min(1, 'Valor do imóvel deve ser maior que zero'),
  downPaymentPercentage: z
    .number()
    .min(0, 'Percentual deve ser positivo')
    .max(100, 'Percentual não pode ser maior que 100%'),
  contractYears: z
    .number()
    .min(1, 'Prazo deve ser maior que zero')
    .max(50, 'Prazo máximo de 50 anos'),
  annualInterestRate: z
    .number()
    .min(0, 'Taxa deve ser positiva')
    .max(50, 'Taxa muito alta'),
  monthlyGrossIncome: z.number().min(0).optional(),
  monthlyExpenses: z.number().min(0).optional(),
})

export type SimulationForm = z.infer<typeof simulationSchema>

'use client'

import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  SimulationForm,
  calculateSimulation,
  simulationSchema,
} from '~/lib/simulation'
import { SimulationFormComponent } from './_components/simulation.form'
import { SimulationResults } from './_components/simulation.result'
import { IncomeAnalysis } from './_components/income.analysis'
import { EmptyState } from './_components/empty.state'
import { useRouter } from 'next/navigation'
import { useCreateSimulation } from '~/hooks/use-simulations'

export default function CreateSimulation() {
  const router = useRouter()
  const createSimulation = useCreateSimulation()

  const form = useForm<SimulationForm>({
    resolver: zodResolver(simulationSchema),
    defaultValues: {
      title: '',
      propertyValue: undefined,
      downPaymentPercentage: undefined,
      contractYears: undefined,
      annualInterestRate: undefined,
      monthlyGrossIncome: undefined,
      monthlyExpenses: undefined,
    },
  })

  const watchedValues = form.watch()

  const calculations = useMemo(() => {
    return calculateSimulation(watchedValues)
  }, [watchedValues])

  const onSubmit = async (data: SimulationForm) => {
    if (!calculations) {
      throw Error('Calculations no available')
    }

    const payload = {
      title: data.title,
      propertyValue: data.propertyValue,
      downPaymentPercentage: data.downPaymentPercentage,
      contractYears: data.contractYears,
      annualInterestRate: data.annualInterestRate,
      monthlyGrossIncome: data.monthlyGrossIncome || null,
      monthlyExpenses: data.monthlyExpenses || null,
      downPaymentAmount: Math.round(calculations.downPaymentAmount),
      financedAmount: Math.round(calculations.financedAmount),
      totalToSave: Math.round(calculations.totalToSave),
      monthlySavingsAmount: Math.round(calculations.monthlySavingsAmount),
      monthlyInstallment: Math.round(calculations.monthlyInstallment || 0),
      incomeCommitmentPercentage:
        Math.round(calculations.incomeCommitmentPercentage || 0) || null,
    }

    createSimulation.mutate(payload, {
      onSuccess: (savedSimulation) => {
        router.push('/simulation/list')
      },
    })
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Nova Simulação</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <SimulationFormComponent
            form={form}
            onSubmit={onSubmit}
            isLoading={false}
          />
        </div>

        <div className="space-y-6">
          {calculations ? (
            <>
              <SimulationResults calculations={calculations} />
              <IncomeAnalysis calculations={calculations} />
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  )
}

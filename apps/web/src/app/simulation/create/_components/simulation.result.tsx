import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Separator } from '~/components/ui/separator'
import { CalculationResults, formatCurrency } from '~/lib/simulation'

interface SimulationResultsProps {
  calculations: CalculationResults
}

export function SimulationResults({ calculations }: SimulationResultsProps) {
  return (
    <Card className="border border-gray-200 shadow-none rounded-[12px]">
      <CardHeader>
        <CardTitle>Resultados da Simulação</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 border border-gray-200 shadow-none rounded-[12px]">
            <p className="text-sm text-gray-600 mb-1">Valor da Entrada</p>
            <p className="text-xl font-semibold text-gray-900">
              {formatCurrency(calculations.downPaymentAmount)}
            </p>
          </div>

          <div className="p-4 bg-gray-50 border border-gray-200 shadow-none rounded-[12px]">
            <p className="text-sm text-gray-600 mb-1">Valor a Financiar</p>
            <p className="text-xl font-semibold text-gray-900">
              {formatCurrency(calculations.financedAmount)}
            </p>
          </div>

          <div className="p-4 bg-gray-50 border border-gray-200 shadow-none rounded-[12px]">
            <p className="text-sm text-gray-600 mb-1">Total a Guardar (15%)</p>
            <p className="text-xl font-semibold text-gray-900">
              {formatCurrency(calculations.totalToSave)}
            </p>
          </div>

          <div className="p-4 bg-gray-50 border border-gray-200 shadow-none rounded-[12px]">
            <p className="text-sm text-gray-600 mb-1">Prestação Mensal</p>
            <p className="text-xl font-semibold text-gray-900">
              {formatCurrency(calculations.monthlyInstallment)}
            </p>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Poupança Mensal Necessária
          </span>
          <span className="font-semibold text-lg">
            {formatCurrency(calculations.monthlySavingsAmount)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

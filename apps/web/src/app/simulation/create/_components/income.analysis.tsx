import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Progress } from '~/components/ui/progress'
import {
  CalculationResults,
  formatCurrency,
  formatPercentage,
  getIncomeStatus,
} from '~/lib/simulation'

interface IncomeAnalysisProps {
  calculations: CalculationResults
}

export function IncomeAnalysis({ calculations }: IncomeAnalysisProps) {
  const incomeStatus = useMemo(() => {
    return getIncomeStatus(calculations.incomeCommitmentPercentage)
  }, [calculations.incomeCommitmentPercentage])

  if (!calculations.incomeCommitmentPercentage) {
    return null
  }

  return (
    <Card className="border border-gray-200 shadow-none rounded-[12px]">
      <CardHeader>
        <CardTitle>Análise de Renda</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Comprometimento da Renda
            </span>
            <Badge
              variant={
                incomeStatus?.status === 'excellent'
                  ? 'default'
                  : incomeStatus?.status === 'good'
                    ? 'secondary'
                    : 'destructive'
              }
            >
              {formatPercentage(calculations.incomeCommitmentPercentage)}
            </Badge>
          </div>
          <Progress
            value={Math.min(calculations.incomeCommitmentPercentage, 100)}
            className="h-2"
          />
          {incomeStatus && (
            <p className="text-sm text-gray-600">{incomeStatus.message}</p>
          )}
        </div>

        {calculations.availableIncome !== undefined && (
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="text-sm text-gray-600">Renda Disponível</span>
            <span
              className={`font-semibold ${
                calculations.availableIncome >= 0
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {formatCurrency(calculations.availableIncome)}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

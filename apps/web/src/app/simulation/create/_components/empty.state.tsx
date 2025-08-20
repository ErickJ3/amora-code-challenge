import { Card, CardContent } from '~/components/ui/card'

export function EmptyState() {
  return (
    <Card className="border border-gray-200 shadow-none rounded-[12px]">
      <CardContent className="flex items-center justify-center h-64">
        <div className="text-center text-gray-500">
          <p className="text-lg">
            Preencha o valor do imóvel para ver os cálculos
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

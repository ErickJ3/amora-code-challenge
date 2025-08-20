import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { MoreHorizontal, Trash2 } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { TableCell, TableRow } from '~/components/ui/table'
import { Simulation } from '~/lib/services/simulation'
import { formatCurrency, formatPercentage } from '~/lib/simulation'

interface SimulationTableRowProps {
  simulation: Simulation
  onDelete: (id: string) => void
}

export function SimulationTableRow({
  simulation,
  onDelete,
}: SimulationTableRowProps) {
  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell className="font-medium">{simulation.title}</TableCell>
      <TableCell>{formatCurrency(simulation.propertyValue)}</TableCell>
      <TableCell>
        {formatPercentage(simulation.downPaymentPercentage)}
      </TableCell>
      <TableCell>{simulation.contractYears} anos</TableCell>
      <TableCell>{formatPercentage(simulation.annualInterestRate)}</TableCell>
      <TableCell>
        {simulation.monthlyInstallment
          ? formatCurrency(simulation.monthlyInstallment)
          : '-'}
      </TableCell>
      <TableCell>
        <Badge variant="secondary">
          {format(new Date(simulation.createdAt), 'dd/MM/yyyy', {
            locale: ptBR,
          })}
        </Badge>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onDelete(simulation.id)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

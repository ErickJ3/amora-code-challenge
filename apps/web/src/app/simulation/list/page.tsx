'use client'

import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'

import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog'

import { useSimulations, useDeleteSimulation } from '~/hooks/use-simulations'
import { ListEmptyState } from './_components/empty.state'
import { SimulationTableRow } from './_components/simulation.table'
import { SimulationTableSkeleton } from './_components/simulation.table.skeleton'

export default function ListSimulation() {
  const router = useRouter()
  const { data, isLoading, error } = useSimulations()
  const deleteSimulation = useDeleteSimulation()

  const [simulationToDelete, setSimulationToDelete] = useState<string | null>(
    null,
  )

  const simulations = useMemo(() => {
    return data?.simulations || []
  }, [data])

  const handleDelete = (id: string) => {
    setSimulationToDelete(id)
  }

  const handleConfirmDelete = () => {
    if (simulationToDelete) {
      deleteSimulation.mutate(simulationToDelete)
      setSimulationToDelete(null)
    }
  }

  const handleCancelDelete = () => {
    setSimulationToDelete(null)
  }

  const handleCreateNew = () => {
    router.push('/simulation/create')
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-red-600 mb-2">
            Erro ao carregar simulações
          </h3>
          <p className="text-gray-500">
            Ocorreu um erro ao tentar carregar suas simulações. Tente novamente.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 w-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Simulações</h1>
          <p className="text-gray-500 mt-2">
            Gerencie suas simulações de financiamento imobiliário
          </p>
        </div>
        <Button
          onClick={handleCreateNew}
          className="rounded-[10px] bg-[#00144b] hover:bg-[#2c4a9b] cursor-pointer h-10"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova Simulação
        </Button>
      </div>

      <Card className="rounded-[24px] shadow-none">
        <CardHeader>
          <CardTitle>Suas Simulações ({simulations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {simulations.length === 0 && !isLoading ? (
            <ListEmptyState />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Valor do Imóvel</TableHead>
                    <TableHead>Entrada</TableHead>
                    <TableHead>Prazo</TableHead>
                    <TableHead>Taxa de Juros</TableHead>
                    <TableHead>Parcela Mensal</TableHead>
                    <TableHead>Data de Criação</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <SimulationTableSkeleton />
                  ) : (
                    simulations.map((simulation) => (
                      <SimulationTableRow
                        key={simulation.id}
                        simulation={simulation}
                        onDelete={handleDelete}
                      />
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog
        open={!!simulationToDelete}
        onOpenChange={handleCancelDelete}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta simulação? Esta ação não pode
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDelete}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

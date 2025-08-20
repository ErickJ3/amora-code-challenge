import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { simulationsApi } from '~/lib/services/simulation'

export const SIMULATION_KEYS = {
  all: ['simulations'] as const,
  detail: (id: string) => ['simulations', id] as const,
}

export function useCreateSimulation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: simulationsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SIMULATION_KEYS.all })
      toast.success('Simulação salva com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao salvar simulação. tente novamente!')
    },
  })
}

export function useSimulations() {
  return useQuery({
    queryKey: SIMULATION_KEYS.all,
    queryFn: simulationsApi.getAll,
  })
}

export function useSimulation(id: string) {
  return useQuery({
    queryKey: SIMULATION_KEYS.detail(id),
    queryFn: () => simulationsApi.getById(id),
    enabled: !!id,
  })
}

export function useDeleteSimulation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: simulationsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SIMULATION_KEYS.all })
      toast.success('Simulação excluída com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao excluir simulação. Tente novamente!')
    },
  })
}

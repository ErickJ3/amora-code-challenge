import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '~/components/ui/button'

export function ListEmptyState() {
  const router = useRouter()

  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Nenhuma simulação encontrada
      </h3>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">
        Você ainda não criou nenhuma simulação. Comece criando sua primeira
        simulação agora.
      </p>
      <Button
        onClick={() => router.push('/simulation/create')}
        className="rounded-[10px] bg-[#00144b] hover:bg-[#2c4a9b] cursor-pointer h-10"
      >
        <Plus className="mr-2 h-4 w-4" />
        Nova Simulação
      </Button>
    </div>
  )
}

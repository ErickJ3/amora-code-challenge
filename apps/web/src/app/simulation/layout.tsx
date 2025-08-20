import { AppSidebar } from '~/components/sidebar'
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import QueryProvider from '~/providers/query.provider'

export default function SimulationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryProvider>
      <SidebarProvider>
        <AppSidebar />
        <main>{children}</main>
      </SidebarProvider>
    </QueryProvider>
  )
}

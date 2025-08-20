import { AuthHeader } from './_components/header'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex flex-col">
      <AuthHeader />
      <div className="flex-1 flex">
        <div className="w-full">{children}</div>
      </div>
    </div>
  )
}

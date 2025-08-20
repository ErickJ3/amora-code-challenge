import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { AuthProvider } from '~/providers/auth.provider'
import { Toaster } from '~/components/ui/sonner'
import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'aMORA | Simulador de compra',
  description: 'Simule a compra do seu imovel agora mesmo',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} antialiased font-sans`}>
        <main>
          <AuthProvider>{children}</AuthProvider>
        </main>
        <Toaster />
      </body>
    </html>
  )
}

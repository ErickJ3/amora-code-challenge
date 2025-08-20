import Image from 'next/image'

interface AuthLayoutProps {
  children: React.ReactNode
  heroImage: string
  title: string
  description: string
}

export function AuthLayout({
  children,
  heroImage,
  title,
  description,
}: AuthLayoutProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-0 h-full">
      <div className="hidden lg:flex relative items-center justify-center p-12">
        <div className="relative z-10 text-center space-y-6">
          <div className="relative w-full max-w-lg mx-auto">
            <Image
              src={heroImage}
              alt="Simulador de Imóveis aMORA"
              width={500}
              height={400}
              className="w-full h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
              {description}
            </p>
            <div className="flex items-center justify-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">+10k</div>
                <div className="text-sm text-gray-500">
                  Simulações realizadas
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-500">
                  Satisfação dos usuários
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 lg:p-12 lg:border-l lg:border-gray-200">
        <div className="w-full max-w-md space-y-8 flex justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  )
}

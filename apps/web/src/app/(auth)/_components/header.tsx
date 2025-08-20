import Image from 'next/image'

export const AuthHeader = () => {
  return (
    <header className="backdrop-blur-sm border-b border-gray-200 px-6 py-5">
      <div className="max-w-7xl mx-auto">
        <Image
          src="/logo_amora_blue.svg"
          alt="Logo aMORA"
          width={121}
          height={24}
          className="object-contain"
          priority
        />
      </div>
    </header>
  )
}
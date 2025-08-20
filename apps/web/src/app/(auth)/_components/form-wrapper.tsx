interface AuthFormWrapperProps {
  children: React.ReactNode
  title: {
    mobile: string
    desktop: string
  }
  subtitle: string
}

export function AuthFormWrapper({
  children,
  title,
  subtitle,
}: AuthFormWrapperProps) {
  return (
    <div className="w-full space-y-6">
      <div className="text-center lg:text-left">
        <h1 className="text-2xl font-bold text-gray-900 lg:hidden">
          {title.mobile}
        </h1>
        <h1 className="hidden lg:block text-3xl font-bold text-gray-900">
          {title.desktop}
        </h1>
        <p className="mt-2 text-gray-600">{subtitle}</p>
      </div>
      {children}
    </div>
  )
}

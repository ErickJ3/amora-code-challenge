import { AuthLayout } from '../_components/layout'
import SignInForm from '../_components/sign-in.form'

export default function SignIn() {
  return (
    <AuthLayout
      heroImage="/hero-for-sign-in.webp"
      title="Simule seu imóvel dos sonhos"
      description="Planeje sua compra com inteligência. Nossa ferramenta calcula tudo que você precisa saber para realizar o sonho da casa própria."
    >
      <SignInForm />
    </AuthLayout>
  )
}

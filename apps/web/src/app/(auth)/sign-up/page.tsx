import { AuthLayout } from '../_components/layout'
import SignUpForm from '../_components/sign-up.form'

export default function SignUp() {
  return (
    <AuthLayout
      heroImage="/hero-for-register.webp"
      title="Simule seu imóvel dos sonhos"
      description="Planeje sua compra com inteligência. Nossa ferramenta calcula tudo que você precisa saber para realizar o sonho da casa própria."
    >
      <SignUpForm />
    </AuthLayout>
  )
}

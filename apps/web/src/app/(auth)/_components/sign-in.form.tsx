'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { signInSchema, type SignInFormData } from '~/schemas/auth'
import { AuthFormWrapper } from './form-wrapper'
import { PasswordInput } from '~/components/password-input'
import { signIn } from '~/lib/auth'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'

const INPUT_CLASSES = 'rounded-[10px] shadow-none focus-visible:ring-0 h-10'
const BUTTON_CLASSES =
  'w-full rounded-[10px] bg-[#00144b] hover:bg-[#2c4a9b] cursor-pointer h-10'

export default function SignInForm() {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignInFormData) => {
    const { error } = await signIn.email(data)

    if (error) {
      toast('Falha ao acessar sua conta, tente novamente.')
      throw error
    }

    toast('Conta criada com sucesso, faça login!')
    redirect('/simulation/list')
  }

  return (
    <AuthFormWrapper
      title={{
        mobile: 'Bem-vindo de volta',
        desktop: 'Faça seu login',
      }}
      subtitle="Entre na sua conta para continuar"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    className={INPUT_CLASSES}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="••••••••"
                    className={INPUT_CLASSES}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className={BUTTON_CLASSES}
          >
            {form.formState.isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <span className="text-sm text-gray-600">
          Não tem uma conta?{' '}
          <a
            href="/sign-up"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Cadastre-se
          </a>
        </span>
      </div>
    </AuthFormWrapper>
  )
}

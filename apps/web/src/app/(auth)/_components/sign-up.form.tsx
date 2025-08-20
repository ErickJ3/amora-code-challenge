'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
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
import { signUpSchema, type SignUpFormData } from '~/schemas/auth'
import { signUp } from '~/lib/auth'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: SignUpFormData) => {
    const { error } = await signUp.email(data)

    if (error) {
      toast('Falha ao criar sua conta, tente novamente mais tarde!')
      throw error
    }

    toast('Conta criada com sucesso, faça login!')
    redirect('/sign-in')
  }

  return (
    <div className="w-full space-y-6">
      <div className="text-center lg:text-left">
        <h1 className="text-2xl font-bold text-gray-900 lg:hidden">
          Criar conta
        </h1>
        <h1 className="hidden lg:block text-3xl font-bold text-gray-900">
          Faça seu cadastro
        </h1>
        <p className="mt-2 text-gray-600">Crie sua conta para começar</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Seu nome completo"
                    {...field}
                    className="rounded-[10px] shadow-none focus-visible:ring-0 h-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    {...field}
                    className="rounded-[10px] shadow-none focus-visible:ring-0 h-10"
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
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      {...field}
                      className="rounded-[10px] shadow-none focus-visible:ring-0 h-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      {...field}
                      className="rounded-[10px] shadow-none focus-visible:ring-0 h-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full rounded-[10px] bg-[#00144b] hover:bg-[#2c4a9b] cursor-pointer h-10"
          >
            {form.formState.isSubmitting ? 'Criando conta...' : 'Criar conta'}
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <span className="text-sm text-gray-600">
          Já tem uma conta?{' '}
          <a
            href="/sign-in"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Faça login
          </a>
        </span>
      </div>
    </div>
  )
}

'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useAuth, User } from '~/hooks/use-auth'

interface Session {
  user: User
}

interface AuthContextType {
  user: User | null
  session: Session | null
  isLoading: boolean
  isAuthLoading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<Session>
  signUp: (email: string, password: string, name: string) => Promise<Session>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuthContext should be inside a AuthProvider')
  }

  return context
}

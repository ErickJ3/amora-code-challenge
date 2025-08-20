'use client'

import { useEffect, useState } from 'react'
import { authClient } from '~/lib/auth'

export interface User {
  id: string
  email: string
  name?: string
  createdAt: Date
  updatedAt: Date
}

interface Session {
  user: User
}

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthLoading, setIsAuthLoading] = useState(false)

  useEffect(() => {
    const loadSession = async () => {
      try {
        const { data } = await authClient.getSession()
        setSession(data)
      } catch (error) {
        setSession(null)
        throw error
      } finally {
        setIsLoading(false)
      }
    }

    loadSession()
  }, [])

  const signIn = async (email: string, password: string) => {
    setIsAuthLoading(true)

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      })

      if (error) {
        throw new Error(error.message)
      }

      setSession(data)
      return data
    } catch (error) {
      throw error
    } finally {
      setIsAuthLoading(false)
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    setIsAuthLoading(true)
    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
      })

      if (error) {
        throw new Error(error.message)
      }

      setSession(data)
      return data
    } catch (error) {
      throw error
    } finally {
      setIsAuthLoading(false)
    }
  }

  const signOut = async () => {
    setIsAuthLoading(true)
    try {
      await authClient.signOut()
      setSession(null)
    } catch (error) {
      throw error
    } finally {
      setIsAuthLoading(false)
    }
  }

  return {
    user: session?.user || null,
    session,
    isLoading,
    isAuthLoading,
    isAuthenticated: !!session?.user,
    signIn,
    signUp,
    signOut,
  }
}

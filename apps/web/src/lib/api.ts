import { QueryClient } from '@tanstack/react-query'
import axios from 'axios'

function getApiBaseUrl() {
  if (typeof window === 'undefined') {
    return process.env.API_URL || 'http://api:4000'
  }

  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
}

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
})

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 5000,
      },
    },
  })
}

'use client'
import { type ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useMeQuery } from '@/features/api/auth'

export default function DomainLayout({ children }: Readonly<{ children: ReactNode }>) {
  const router = useRouter()
  const { data, isLoading, isError } = useMeQuery()

  useEffect(() => {
    if (!isLoading && (isError || !data)) {
      router.push('/sign-in')
    }
  }, [data, isLoading, isError, router])

  if (isLoading) {
    return <div>Loading authentication status...</div>
  }

  return { children }
}

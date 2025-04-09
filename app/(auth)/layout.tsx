'use client'
import withAuth from '@/shared/HOC/withAuth'
import { type ReactNode } from 'react'

function AuthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export default withAuth(AuthLayout)

'use client'

import { type ComponentType, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { PrivatePages, PublicPages } from '@/shared/enums'
import { TOKEN } from '@/shared/constants'
import {useMeQuery} from '@/features/auth/api';

const PUBLIC_PATHS = [
  PublicPages.emailConfirmed,
  PublicPages.signUpVerificationExpired,
  PublicPages.signIn,
  PublicPages.policy,
  PublicPages.signUp,
  PublicPages.terms,
  PublicPages.passwordRecoveryVerificationExpired,
  PublicPages.forgotPassword,
  PublicPages.createNewPassword,
].map(String)

const PROTECTED_PATHS = [PrivatePages.profile].map(String)

export const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthComponent = (props: P) => {
    const router = useRouter()
    const pathname = usePathname()
    const { data: meData, isLoading } = useMeQuery()
    const [authStatus, setAuthStatus] = useState<'checking' | 'auth' | 'unauth'>('checking')

    useEffect(() => {
      const checkAuth = () => !!localStorage.getItem(TOKEN)

      const verifyAuth = () => {
        const isAuthenticated = checkAuth()

        const isPublic = PUBLIC_PATHS.some(p => pathname.startsWith(p))
        const isProtected = PROTECTED_PATHS.some(p => pathname.startsWith(p))

        // Если токен есть, но user не получен (невалидный токен)
        if (isAuthenticated && !isLoading && !meData) {
          router.replace('/')
          setAuthStatus('unauth')
          return
        }

        if (isAuthenticated) {
          if (isPublic) {
            setAuthStatus('auth')
          } else {
            setAuthStatus('auth')
          }
        } else {
          if (isProtected) {
            router.replace(PublicPages.signIn)
            setAuthStatus('unauth')
          } else {
            setAuthStatus('unauth')
          }
        }
      }

      verifyAuth()
    }, [pathname, router, isLoading, meData])

    if (authStatus === 'checking' || (authStatus === 'auth' && isLoading)) {
      return <div></div>
    }

    if (
      (authStatus === 'auth' && !PUBLIC_PATHS.includes(pathname)) ||
      (authStatus === 'unauth' && PUBLIC_PATHS.includes(pathname))
    ) {
      return <WrappedComponent {...props} />
    }

    return null
  }

  return AuthComponent
}

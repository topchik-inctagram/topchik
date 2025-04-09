'use client'

import { type ComponentType, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { PrivatePages, PublicPages } from '@/shared/enums'
import { TOKEN } from '@/shared/constants'

const PUBLIC_PATHS = [
  PublicPages.emailConfirmed,
  PublicPages.signUpVerificationExpired,
  PublicPages.signIn,
  PublicPages.policy,
  PublicPages.signUp,
  PublicPages.terms,
  PublicPages.passwordRecoveryVerificationExpired,
  PublicPages.forgotPassword,
].map(String)

const PROTECTED_PATHS = [PrivatePages.profile].map(String)

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthComponent = (props: P) => {
    const router = useRouter()
    const pathname = usePathname()
    const [authStatus, setAuthStatus] = useState<'checking' | 'auth' | 'unauth'>('checking')

    useEffect(() => {
      const checkAuth = () => !!localStorage.getItem(TOKEN)

      const verifyAuth = () => {
        const isAuthenticated = checkAuth()

        const isPublic = PUBLIC_PATHS.some(p => pathname.startsWith(p))
        const isProtected = PROTECTED_PATHS.some(p => pathname.startsWith(p))

        if (isAuthenticated) {
          if (isPublic) {
            router.replace(PrivatePages.profile)
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
    }, [pathname, router])

    if (authStatus === 'checking') {
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

export default withAuth

import { useEffect, useState } from 'react'
import s from './Header.module.scss'
import BellIcon from '@/public/icons/OutlineBell'
import Link from 'next/link'
import { Button, Typography } from '@/shared/components'
import { PublicPages } from '@/shared/enums'
import { TOKEN } from '@/shared/constants'
import { usePathname } from 'next/navigation'

type Props = {
  isLoggedIn?: boolean
  selectedLanguage?: string
  onLanguageChange?: (lang: string) => void
  notificationCount?: number
}

export const Header = ({
  selectedLanguage = 'english',
  onLanguageChange,
  notificationCount = 0,
}: Props) => {
  const pathname = usePathname()
  const [isLogged, setIsLogged] = useState(localStorage.getItem(TOKEN))

  useEffect(() => {
    const checkAuth = () => {
      setIsLogged(localStorage.getItem(TOKEN))
    }
    checkAuth()

    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  useEffect(() => {
    setIsLogged(localStorage.getItem(TOKEN))
  }, [pathname])

  return (
    <header className={s.header}>
      <Typography as="h1" className={s.brand} variant="large">
        Inctagram
      </Typography>

      <div className={s.controls}>
        {/* Icon */}
        {!!isLogged && (
          <div className={s.bellWrapper}>
            <BellIcon className={s.bellIcon} />
            {notificationCount > 0 && (
              <span className={s.badge}>{notificationCount > 99 ? '99+' : notificationCount}</span>
            )}
          </div>
        )}

        {/* Lang */}
        <div className={s.languageSelector}>
          <select value={selectedLanguage} onChange={e => onLanguageChange?.(e.target.value)}>
            <option value="english">English</option>
            <option value="russian">Russian</option>
          </select>
        </div>

        {/* Buttons */}
        {!isLogged && (
          <>
            <Button asChild variant="miniOutlined">
              <Link href={PublicPages.signIn}>Log in</Link>
            </Button>
            <Button asChild>
              <Link href={PublicPages.signUp}>Sign up</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  )
}

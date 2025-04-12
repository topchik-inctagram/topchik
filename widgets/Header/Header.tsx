'use client'
import s from './Header.module.scss'
import { useEffect, useState } from 'react'
import BellIcon from '@/public/icons/OutlineBell'
import Link from 'next/link'
import { Button, Typography } from '@/shared/components'
import { PublicPages } from '@/shared/enums'
import { TOKEN } from '@/shared/constants'
import { usePathname } from 'next/navigation'
import RussiaFlag from '@/public/icons/FlagRussia'
import UnitedKingdomFlag from '@/public/icons/FlagUnitedKingdom'
import { Select } from '@/shared/components/Select'

type Language = 'EN' | 'RU'

type Props = {
  selectedLanguage?: string
  onLanguageChange?: (lang: string) => void
  notificationCount?: number
}

export const Header = ({
  selectedLanguage ='english',
  onLanguageChange,
  notificationCount = 0,
}: Props) => {
  const pathname = usePathname()

  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN)
    }
    return null
  }

  const [isLogged, setIsLogged] = useState<string | null>(getToken)

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

  const languageOptions = [
    { value: 'RU', label: 'Russian', icon: <RussiaFlag /> },
    { value: 'EN', label: 'English', icon: <UnitedKingdomFlag /> },
  ]

  const selectComponent = (
    <Select
      isLanguageSwitcher
      options={languageOptions}
      placeholder="Select language"
      value={selectedLanguage}
      onValueChange={(value: string) => onLanguageChange?.(value as Language)}
    />
  )

  return (
    <header className={s.header}>
      <Typography as="h1" className={s.brand} variant="large">
        Inctagram
      </Typography>

      <div className={s.controls}>
        {!!isLogged ? (
          <div className={s.notifyLangGroup}>
            <div className={s.bellWrapper}>
              <BellIcon className={s.bellIcon} />
              {notificationCount > 0 && (
                <span className={s.badge}>
                  {notificationCount > 99 ? '99+' : notificationCount}
                </span>
              )}
            </div>
            {selectComponent}
          </div>
        ) : (
          <div className={s.languageAndAuth}>
            <div className={s.languageSelector}>{selectComponent}</div>
            <div className={s.authButtons}>
              <Button asChild variant="miniOutlined">
                <Link href={PublicPages.signIn}>Log in</Link>
              </Button>
              <Button asChild>
                <Link href={PublicPages.signUp}>Sign up</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

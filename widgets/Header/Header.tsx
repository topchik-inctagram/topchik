import React from 'react'
import s from './Header.module.scss'
import BellIcon from '@/public/icons/OutlineBell'
import Link from 'next/link'
import { Button, Typography } from '@/shared/components'

type Props = {
  isLoggedIn?: boolean
  selectedLanguage?: string
  onLanguageChange?: (lang: string) => void
  notificationCount?: number
}

export const Header = ({
  isLoggedIn,
  selectedLanguage = 'english',
  onLanguageChange,
  notificationCount = 0,
}: Props) => {
  return (
    <header className={s.header}>
      <Typography as="h1" className={s.brand} variant="large">
        Inctagram
      </Typography>

      <div className={s.controls}>
        {/* Icon */}
        {isLoggedIn && (
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
        {!isLoggedIn && (
          <>
            <Button asChild variant="miniOutlined">
              <Link href="#">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="#">Sign up</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  )
}

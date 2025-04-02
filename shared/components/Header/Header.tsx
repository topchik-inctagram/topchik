import React from 'react'
import { Button } from '../Button/Button'
import { Typography } from '../Typography/Typography'
import s from './Header.module.scss'
import BellIcon from '@/public/icons/OutlineBell'

type HeaderProps = {
  isLoggedIn?: boolean
  selectedLanguage?: string
  onLogin?: () => void
  onSignUp?: () => void
  onLanguageChange?: (lang: string) => void
  onBellClick?: () => void
  notificationCount?: number
}

export const Header = ({
  isLoggedIn,
  selectedLanguage = 'english',
  onLogin,
  onSignUp,
  onLanguageChange,
  onBellClick,
  notificationCount = 0,
}: HeaderProps) => {
  return (
    <header className={s.header}>
      <Typography as="span" className={s.brand} variant="h1">
        Inctagram
      </Typography>

      <div className={s.controls}>
        {/* Icon */}
        {isLoggedIn && (
          <div className={s.bellWrapper} onClick={onBellClick}>
            <BellIcon className={s.bellIcon} />
            {notificationCount > 0 && (
              <span className={s.badge}>
                {notificationCount > 99 ? '99+' : notificationCount}
              </span>
            )}
          </div>
        )}

        {/* Lang */}
        <div className={s.languageSelector}>
          <select
            value={selectedLanguage}
            onChange={(e) => onLanguageChange?.(e.target.value)}
          >
            <option value="english">English</option>
            <option value="russian">Russian</option>
          </select>
        </div>

        {/* Buttons */}
        {!isLoggedIn && (
          <>
            <Button variant="miniOutlined" onClick={onLogin}>
              Log in
            </Button>
            <Button onClick={onSignUp}>Sign up</Button>
          </>
        )}
      </div>
    </header>
  )
}

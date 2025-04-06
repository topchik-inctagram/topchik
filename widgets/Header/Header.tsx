import s from './Header.module.scss'
import BellIcon from '@/public/icons/OutlineBell'
import Link from 'next/link'
import { Button, Typography } from '@/shared/components'
import RussiaFlag from '@/public/icons/FlagRussia'
import UnitedKingdomFlag from '@/public/icons/FlagUnitedKingdom'
import { Select } from '@/shared/components/Select'

type Language = 'EN' | 'RU'

type Props = {
  isLoggedIn?: boolean
  selectedLanguage?: Language
  onLanguageChange?: (lang: Language) => void
  notificationCount?: number
}

export const Header = ({
  isLoggedIn,
  selectedLanguage,
  onLanguageChange,
  notificationCount = 0,
}: Props) => {
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
        {isLoggedIn ? (
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
                <Link href="#">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="#">Sign up</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

'use client'
import s from './Navbar.module.scss'
import Link from 'next/link'
import { clsx } from 'clsx'
import {
  Bookmark,
  BookmarkOutline,
  Home,
  HomeOutline,
  LogOut,
  LogOutOutline,
  MessageCircle,
  MessageCircleOutline,
  Person,
  PersonOutline,
  PlusSquare,
  PlusSquareOutline,
  Search,
  SearchOutline,
  TrendUp,
  TrendUpOutline,
} from '@/public/icons'
import { Typography } from '@/shared/components'
import { type ComponentPropsWithRef, useState } from 'react'
import { SimpleYesNoDialog } from '@/entities/SimpleYesNoDialog'
import { usePathname, useRouter } from 'next/navigation'
import { PrivatePages, PublicPages } from '@/shared/enums'
import { useLogoutMutation, useMeQuery } from '@/features/auth/api'
import { TOKEN } from '@/shared/constants'
import { baseApi } from '@/shared/store'

type Props = {
  isMobile?: boolean
} & ComponentPropsWithRef<'nav'>

export const Navbar = (props: Props) => {
  const { isMobile, ...rest } = props

  return isMobile ? <MobileNavbar {...rest} /> : <DesktopNavbar {...rest} />
}

function MobileNavbar({ className, ...rest }: ComponentPropsWithRef<'nav'>) {
  const classNames = {
    nav: clsx(s.mobileNav, className),
    mobileContainer: s.mobileContainer,
  }
  const active = true
  return (
    <nav className={classNames.nav} {...rest}>
      <ul className={classNames.mobileContainer}>
        <li>
          <Link href="#">{active ? <Home /> : <HomeOutline />}</Link>
        </li>
        <li>
          <Link href="#">{active ? <PlusSquare /> : <PlusSquareOutline />}</Link>
        </li>
        <li>
          <Link href="#">{active ? <MessageCircle /> : <MessageCircleOutline />}</Link>
        </li>
        <li>
          <Link href="#">{active ? <Search /> : <SearchOutline />}</Link>
        </li>
        <li>
          <Link href="#">{active ? <Person /> : <PersonOutline />}</Link>
        </li>
      </ul>
    </nav>
  )
}

function DesktopNavbar({ className, ...rest }: ComponentPropsWithRef<'nav'>) {
  const classNames = {
    nav: clsx(s.desktopNav, className),
    firstContainer: clsx(s.desktopContainer, s.desktopFirstContainer),
    secondContainer: clsx(s.desktopSecondContainer, s.desktopContainer),
    activeLink: s.activeLink,
    logoutText: (isDisabled: boolean) => clsx(s.logoutText, isDisabled && s.disabled),
  }

  const router = useRouter()
  const pathname = usePathname()
  const { data: meData } = useMeQuery()
  const [logoutMutation, { isLoading: isLoadingLogout }] = useLogoutMutation()
  const [isLogoutOpen, setIsLogoutOpen] = useState(false)

  const handleConfirmLogout = async () => {
    try {
      await logoutMutation().unwrap()
      localStorage.removeItem(TOKEN)
      baseApi.util.resetApiState()
      setIsLogoutOpen(false)
      router.push(PublicPages.signIn)
    } catch (error) {
      console.error('Logout failed', error)
    }
  }

  const actualLink = (actualPath: string) => ({
    active: pathname === actualPath,
    className: pathname === actualPath ? classNames.activeLink : '',
  })
  const active = false

  // if you want to disable link you need to add data-disabled='disabled' in link props
  // data-disabled="disabled"

  return (
    <>
      <nav className={classNames.nav} {...rest}>
        <ul>
          <div className={classNames.firstContainer}>
            <li>
              <Typography as={Link} href="#" variant="medium_14">
                {active ? <Home /> : <HomeOutline />} Feed
              </Typography>
            </li>
            <li>
              <Typography as={Link} href="#" variant="medium_14">
                {active ? <PlusSquare /> : <PlusSquareOutline />} Create
              </Typography>
            </li>
            <li>
              <Typography
                as={Link}
                className={actualLink(`${PrivatePages.profile}/${meData?.id}`).className}
                href={`${PrivatePages.profile}/${meData?.id}`}
                variant="medium_14"
              >
                {actualLink(`${PrivatePages.profile}/${meData?.id}`).active ? (
                  <Person />
                ) : (
                  <PersonOutline />
                )}{' '}
                My Profile
              </Typography>
            </li>
            <li>
              <Typography as={Link} href="#" variant="medium_14">
                {active ? <MessageCircle /> : <MessageCircleOutline />} Messenger
              </Typography>
            </li>
            <li>
              <Typography as={Link} href="#" variant="medium_14">
                {active ? <Search /> : <SearchOutline />} Search
              </Typography>
            </li>
          </div>
          <div className={classNames.secondContainer}>
            <li>
              <Typography as={Link} href="#" variant="medium_14">
                {active ? <TrendUp /> : <TrendUpOutline />} Statistics
              </Typography>
            </li>
            <li>
              <Typography as={Link} href="#" variant="medium_14">
                {active ? <Bookmark /> : <BookmarkOutline />} Favorites
              </Typography>
            </li>
          </div>
          <li>
            <Typography
              className={classNames.logoutText(isLoadingLogout)}
              variant="medium_14"
              onClick={() => setIsLogoutOpen(true)}
            >
              {active ? <LogOut /> : <LogOutOutline />} Log Out
            </Typography>
          </li>
        </ul>
      </nav>

      {isLogoutOpen && meData?.email && (
        <SimpleYesNoDialog
          open
          boldText={meData.email}
          description='Are you really want to log out of your account "_boldText_"?'
          title="Log Out"
          onCancel={() => setIsLogoutOpen(false)}
          onConfirm={handleConfirmLogout}
        />
      )}
    </>
  )
}

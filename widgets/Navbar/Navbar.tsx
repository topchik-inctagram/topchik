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
import { LogoutModal } from '@/entities/LogoutModal'
import { usePathname } from 'next/navigation'
import { PrivatePages } from '@/shared/enums'

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
  }
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const pathname = usePathname()

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
                className={actualLink(PrivatePages.profile).className}
                href={PrivatePages.profile}
                variant="medium_14"
              >
                {actualLink(PrivatePages.profile).active ? <Person /> : <PersonOutline />} My
                Profile
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
            <Typography as="button" variant="medium_14" onClick={() => setIsLogoutModalOpen(true)}>
              {active ? <LogOut /> : <LogOutOutline />} Log Out
            </Typography>
          </li>
        </ul>
      </nav>
      <LogoutModal open={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} />
    </>
  )
}

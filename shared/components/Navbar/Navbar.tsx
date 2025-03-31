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
} from '@/public'
import { Typography } from '@/shared/components'

type Props = {
  className?: string
  isMobile?: boolean
}

export const Navbar = (props: Props) => {
  const { className, isMobile, ...rest } = props

  // if you want to disable link you need to add data-disabled='disabled' in link props
  return isMobile ? (
    <MobileNavbar className={className} {...rest} />
  ) : (
    <DesktopNavbar className={className} {...rest} />
  )
}

function MobileNavbar(className: any) {
  const classNames = {
    nav: clsx(s.mobileNav, className),
  }
  const active = true
  return (
    <nav className={classNames.nav}>
      <ul>
        <li>
          <Link href="#">{active ? <HomeOutline /> : <Home />}</Link>
        </li>
        <li>
          <Link href="#">{active ? <PlusSquareOutline /> : <PlusSquare />}</Link>
        </li>
        <li>
          <Link href="#">{active ? <MessageCircleOutline /> : <MessageCircle />}</Link>
        </li>
        <li>
          <Link href="#">{active ? <SearchOutline /> : <Search />}</Link>
        </li>
        <li>
          <Link href="#">{active ? <PersonOutline /> : <Person />}</Link>
        </li>
      </ul>
    </nav>
  )
}

function DesktopNavbar(className: any) {
  const classNames = {
    nav: clsx(s.desktopNav, className),
    firstContainer: clsx(s.desktopContainer, s.desktopFirstContainer),
    secondContainer: clsx(s.desktopSecondContainer, s.desktopContainer),
  }
  const active = true
  return (
    <nav className={classNames.nav}>
      <ul>
        <div className={classNames.firstContainer}>
          <li>
            <Typography as={Link} data-disabled="disabled" href="#">
              {active ? <HomeOutline /> : <Home />} Feed
            </Typography>
          </li>
          <li>
            <Typography as={Link} href="#" variant="medium_14">
              {active ? <PlusSquareOutline /> : <PlusSquare />} Create
            </Typography>
          </li>
          <li>
            <Typography as={Link} href="#" variant="medium_14">
              {active ? <PersonOutline /> : <Person />} My Profile
            </Typography>
          </li>
          <li>
            <Typography as={Link} href="#" variant="medium_14">
              {active ? <MessageCircleOutline /> : <MessageCircle />} Messenger
            </Typography>
          </li>
          <li>
            <Typography as={Link} href="#" variant="medium_14">
              {active ? <SearchOutline /> : <Search />} Search
            </Typography>
          </li>
        </div>
        <div className={classNames.secondContainer}>
          <li>
            <Typography as={Link} href="#" variant="medium_14">
              {active ? <TrendUpOutline /> : <TrendUp />} Statistics
            </Typography>
          </li>
          <li>
            <Typography as={Link} href="#" variant="medium_14">
              {active ? <BookmarkOutline /> : <Bookmark />} Favorites
            </Typography>
          </li>
        </div>
        <li>
          <Typography as={Link} href="#" variant="medium_14">
            {active ? <LogOutOutline /> : <LogOut />} Log Out
          </Typography>
        </li>
      </ul>
    </nav>
  )
}

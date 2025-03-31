import s from './Navbar.module.scss'
import Link from 'next/link'
import { clsx } from 'clsx'
import {
  BookmarkOutline,
  HomeOutline,
  LogOut,
  MessageCircleOutline,
  Person,
  PlusSquareOutline,
  Search,
  TrendUpOutline,
} from '@/public'
import { Typography } from '@/shared/components'

type Props = {
  className?: string
  isMobile?: boolean
}

export const Navbar = (props: Props) => {
  const { className, ...rest } = props

  const classNames = {
    nav: clsx(s.nav, className),
    firstContainer: clsx(s.container, s.firstContainer),
    secondContainer: clsx(s.secondContainer, s.container),
    item: s.item,
  }
  return (
    <nav className={classNames.nav} {...rest}>
      <ul>
        <div className={classNames.firstContainer}>
          <li>
            <Typography as={Link} href="#">
              <HomeOutline /> Feed
            </Typography>
          </li>
          <li>
            <Typography as={Link} href="#" variant="medium_14">
              <PlusSquareOutline /> Create
            </Typography>
          </li>
          <li>
            <Typography as={Link} href="#" variant="medium_14">
              <Person /> My Profile
            </Typography>
          </li>
          <li>
            <Typography as={Link} href="#" variant="medium_14">
              <MessageCircleOutline /> Messenger
            </Typography>
          </li>
          <li>
            <Typography as={Link} href="#" variant="medium_14">
              <Search /> Search
            </Typography>
          </li>
        </div>
        <div className={classNames.secondContainer}>
          <li>
            <Typography as={Link} href="#" variant="medium_14">
              <TrendUpOutline /> Statistics
            </Typography>
          </li>
          <li>
            <Typography as={Link} href="#" variant="medium_14">
              <BookmarkOutline /> Favorites
            </Typography>
          </li>
        </div>
        <li>
          <Typography as={Link} href="#" variant="medium_14">
            <LogOut /> Log Out
          </Typography>
        </li>
      </ul>
    </nav>
  )
}

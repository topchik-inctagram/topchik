import s from './Sidebar.module.scss'
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

type Props = {
  className?: string
}

export const Sidebar = (props: Props) => {
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
            <Link href="#">
              <HomeOutline /> Feed
            </Link>
          </li>
          <li>
            <Link href="#">
              <PlusSquareOutline /> Create
            </Link>
          </li>
          <li>
            <Link href="#">
              <Person /> My Profile
            </Link>
          </li>
          <li>
            <Link href="#">
              <MessageCircleOutline /> Messenger
            </Link>
          </li>
          <li>
            <Link href="#">
              <Search /> Search
            </Link>
          </li>
        </div>
        <div className={classNames.secondContainer}>
          <li>
            <Link href="#">
              <TrendUpOutline /> Statistics
            </Link>
          </li>
          <li>
            <Link href="#">
              <BookmarkOutline /> Favorites
            </Link>
          </li>
        </div>
        <li>
          <Link href="#">
            <LogOut /> Log Out
          </Link>
        </li>
      </ul>
    </nav>
  )
}

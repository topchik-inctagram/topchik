import { type ComponentPropsWithRef, type ReactNode } from 'react'
import { Typography } from '@/shared/components'
import s from './ActionDropdownItem.module.scss'
import clsx from 'clsx'
import { MoreHorizontalOutline } from '@/public/icons'

type Props = {
  icon: ReactNode
  text: string
} & Omit<ComponentPropsWithRef<'div'>, 'onChange'>

export const ActionDropdownItem = ({ icon, text, className, onClick, ...rest }: Props) => {
  const classNames = {
    item: clsx(s.item, className),
    icon: s.icon,
    text: s.text,
  }

  return (
    <div className={classNames.item} {...rest} onClick={onClick}>
      <span className={classNames.icon}>{icon}</span>
      <Typography as="p" className={classNames.text} variant="regular_14">
        {text}
      </Typography>
    </div>
  )
}

export const ActionDropdownDots = () => {
  const classNames = {
    dots: s.dots,
  }

  return (
    <div className={classNames.dots}>
      <MoreHorizontalOutline />
    </div>
  )
}

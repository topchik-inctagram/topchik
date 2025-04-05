import { ComponentPropsWithRef, ReactNode } from 'react'
import { Typography } from '@/shared/components'
import s from './ActionDropdownItem.module.scss'
import clsx from 'clsx'
import { MoreHorizontalOutline } from '@/public'

type ActionDropdownItemProps = {
  icon: ReactNode
  text: string
} & ComponentPropsWithRef<'div'> &
  Omit<ComponentPropsWithRef<'div'>, 'onChange'>

export const ActionDropdownItem = ({
  icon,
  text,
  className,
  onClick,
  ...rest
}: ActionDropdownItemProps) => {
  const classNames = {
    item: clsx(s.item, className),
    icon: s.icon,
    text: s.text,
  }

  return (
    <div className={classNames.item} {...rest} onClick={onClick}>
      <span className={classNames.icon}>{icon}</span>
      <Typography as="p" variant="regular_14" className={classNames.text}>
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

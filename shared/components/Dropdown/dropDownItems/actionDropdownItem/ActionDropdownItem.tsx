import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Typography } from '@/shared/components'
import s from './ActionDropdownItem.module.scss'
import clsx from 'clsx'
import { MoreHorizontalOutline } from '@/public'

type ActionDropdownItemProps = {
  icon: ReactNode
  label: string
} & ComponentPropsWithoutRef<'div'> &
  Omit<ComponentPropsWithoutRef<'div'>, 'onChange'>

export const ActionDropdownItem = ({
  icon,
  label,
  className,
  onClick,
  ...rest
}: ActionDropdownItemProps) => {
  const classNames = {
    item: clsx(s.item, className),
    icon: s.icon,
    label: s.label,
  }

  return (
    <div className={classNames.item} {...rest} onClick={onClick}>
      <span className={classNames.icon}>{icon}</span>
      <Typography as="span" variant="regular_14" className={classNames.label}>
        {label}
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

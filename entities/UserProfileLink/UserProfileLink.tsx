import type { ComponentPropsWithRef } from 'react'

import { Typography, type TypographyVariant } from '@/shared/components'
import Link from 'next/link'
import s from './UserProfileLink.module.scss'
import clsx from 'clsx'

interface Props extends ComponentPropsWithRef<typeof Link> {
  userName?: string
  variant?: TypographyVariant
}

export const UserProfileLink = ({
  className,
  children,
  userName,
  variant = 'h3',
  href,
  ...rest
}: Props) => {
  const classNames = {
    link: clsx(s.userProfileLink, className),
  }
  return (
    <Typography as={Link} className={classNames.link} href={href} variant={variant} {...rest}>
      {userName ?? children}
    </Typography>
  )
}

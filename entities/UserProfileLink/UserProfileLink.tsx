import type { ComponentPropsWithRef } from 'react'

import { Typography, type TypographyVariant } from '@/shared/components'
import Link from 'next/link'
import s from './UserProfileLink.module.scss'
import clsx from 'clsx'

type Props = {
  userName: string
  variant?: TypographyVariant
} & ComponentPropsWithRef<typeof Link>

export const UserProfileLink = ({ className, userName, variant = 'h3', href, ...rest }: Props) => {
  const classNames = {
    link: clsx(s.userProfileLink, className),
  }
  return (
    <Typography as={Link} className={classNames.link} href={href} variant={variant} {...rest}>
      {userName}
    </Typography>
  )
}

import { type ComponentPropsWithRef, type ElementType } from 'react'

import s from './Typography.module.scss'
import Link, { type LinkProps } from 'next/link'
import clsx from 'clsx'

export type TypographyVariant =
  | 'large'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'regular_16'
  | 'bold_16'
  | 'regular_14'
  | 'medium_14'
  | 'bold_14'
  | 'small'
  | 'semi_bold_small'
  | 'regular_link'
  | 'small_link'

type Props<T extends ElementType> = {
  as?: T
  variant?: TypographyVariant
} & (T extends typeof Link ? LinkProps : ComponentPropsWithRef<T>)

export const Typography = <T extends ElementType = 'p'>(props: Props<T>) => {
  const { as, className, children, variant = 'regular_16', ...rest } = props

  const classNames = {
    typography: clsx(s.typography, s[variant], className),
  }

  //todo move to utils
  function exhaustiveCheck(value: never) {
    return value
  }

  function typographyVar(as: ElementType = 'p', variant: TypographyVariant = 'regular_16') {
    switch (variant) {
      case 'regular_16':
      case 'bold_16':
      case 'regular_14':
      case 'medium_14':
      case 'large':
      case 'small':
      case 'bold_14':
      case 'semi_bold_small':
        return as
      case 'h1':
        return 'h1'
      case 'h2':
        return 'h2'
      case 'h3':
        return 'h3'
      case 'regular_link':
      case 'small_link':
        return Link
      default:
        return exhaustiveCheck(variant)
    }
  }

  const Component = typographyVar(as, variant)

  return (
    <Component className={classNames.typography} {...rest}>
      {children}
    </Component>
  )
}

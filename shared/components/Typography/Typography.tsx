import { type ComponentPropsWithoutRef, type ElementType, type RefObject } from 'react'

import s from './Typography.module.scss'
import Link from 'next/link'
import clsx from 'clsx'
import { Slot } from '@radix-ui/react-slot'

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

type Props<T extends ElementType = 'p'> = {
  as?: T
  text?: string
  ref?: RefObject<T>
  asChild?: boolean
  variant?: TypographyVariant
}

export type TypographyProps<T extends ElementType> = Props<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>

export const Typography = <T extends ElementType = 'p'>(props: TypographyProps<T>) => {
  const {
    as,
    children,
    className,
    text = '',
    asChild,
    variant = 'regular_16',
    ref,
    ...rest
  } = props

  const classNames = {
    typography: clsx(s.typography, s[variant], className),
  }

  //todo move to utils
  function exhaustiveCheck(value: never) {
    return value
  }

  function typographyVar(as: ElementType = 'p', variant: Props<T>['variant'] = 'regular_16') {
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

  const Component = asChild ? Slot : typographyVar(as, variant)

  return (
    <Component ref={ref} className={classNames.typography} {...rest}>
      {children ?? text}
    </Component>
  )
}

import { type ComponentPropsWithoutRef, type RefObject } from 'react'
import s from './Button.module.scss'
import clsx from 'clsx'
import { Slot } from '@radix-ui/react-slot'

type Props = {
  variant?: 'primary' | 'secondary' | 'outlined' | 'miniOutlined' | 'languageButton'
  asChild?: boolean
  ref?: RefObject<HTMLButtonElement>
  fullWidth?: boolean
} & ComponentPropsWithoutRef<'button'>

export const Button = ({
  variant = 'primary',
  className,
  asChild,
  fullWidth,
  ref,
  ...rest
}: Props) => {
  // const Component = asChild ? Slot : 'button'

  const Component = asChild ? Slot : 'button'
  const classNames = {
    button: clsx(s.button, s[variant], fullWidth && s.fullWidth, className),
  }

  return <Component ref={ref} className={classNames.button} {...rest} />
}

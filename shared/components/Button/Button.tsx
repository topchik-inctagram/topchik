import { type ComponentPropsWithRef } from 'react'
import s from './Button.module.scss'
import clsx from 'clsx'
import { Slot } from '@radix-ui/react-slot'

type Props = {
  variant?: 'primary' | 'secondary' | 'outlined' | 'miniOutlined' | 'languageButton'
  asChild?: boolean
  fullWidth?: boolean
} & ComponentPropsWithRef<'button'>

export const Button = ({ variant = 'primary', className, asChild, fullWidth, ...rest }: Props) => {
  const Component = asChild ? Slot : 'button'
  const classNames = {
    button: clsx(s.button, s[variant], fullWidth && s.fullWidth, className),
  }

  return <Component className={classNames.button} {...rest} />
}

import { type ComponentPropsWithRef, type ElementType } from 'react'
import { clsx } from 'clsx'
import s from './Сard.module.scss'

type Props<T extends ElementType = 'div'> = {
    as?: T
} & ComponentPropsWithRef<T>

export const Card = <T extends ElementType = 'div'>({as, className, ...rest}: Props<T>) => {
  const classNames = {
    card: clsx(s.root, className),
  }

  const Component = as || 'div'

  return <Component className={classNames.card} {...rest} />
}

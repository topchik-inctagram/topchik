import type { ComponentPropsWithRef, CSSProperties, ElementType } from 'react'
import s from './Container.module.scss'
import clsx from 'clsx'

type Props<T extends ElementType = 'section'> = ComponentPropsWithRef<T> & {
  as?: T
  marginTop?: CSSProperties['marginTop']
  paddingRight?: CSSProperties['paddingRight']
  paddingLeft?: CSSProperties['paddingLeft']
  direction?: 'row' | 'column'
  maxWidth?: boolean
  align?: CSSProperties['alignItems']
}

export function Container<T extends ElementType = 'section'>({
  children,
  className,
  direction,
  marginTop,
  paddingRight,
  paddingLeft,
  maxWidth,
  align = 'center',
  style,
  ref,
  as,
  ...rest
}: Props<T>) {
  const Component = as || 'section'

  const classNames = {
    container: clsx(
      className,
      s.container,
      direction === 'row' && s.row,
      direction === 'column' && s.column,
      maxWidth && s.maxWidth
    ),
  }
  const styles: CSSProperties = {
    marginTop: marginTop,
    paddingRight: paddingRight,
    paddingLeft: paddingLeft,
    maxWidth: maxWidth,
    alignItems: align,
    ...style,
  }

  return (
    <Component ref={ref} className={classNames.container} style={styles} {...rest}>
      {children}
    </Component>
  )
}

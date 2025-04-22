'use client'
import clsx from 'clsx'
import {type ComponentPropsWithRef, type CSSProperties, type ElementType} from 'react'
import s from './PageContainer.module.scss'

type Props<T extends ElementType = 'main'> =
    ComponentPropsWithRef<T> & {
  as?: T
  mt?: CSSProperties['marginTop']
  pr?: CSSProperties['paddingRight']
  pl?: CSSProperties['paddingLeft']
  direction?: 'row' | 'column'
  maxWidth?: string
}

export function PageContainer<T extends ElementType = 'main'>({
  as,
  className,
  mt = '24px',
  pr,
  pl,
  direction = 'column',
  style,
  ref,
  maxWidth,
  ...rest }: Props<T>) {

  const Component = as || 'main'

  const classNames = {
    page: clsx(className, s.container, direction === 'row' && s.row,
      direction === 'column' && s.column),
  }
  const styles: CSSProperties = {
    marginTop: mt,
    paddingRight: pr,
    paddingLeft: pl,
    maxWidth: maxWidth,
    ...style }

  return <Component ref={ref} className={classNames.page} style={styles} {...rest} />
}

'use client'
import clsx from 'clsx'
import { type ComponentPropsWithRef, type CSSProperties } from 'react'
import s from './PageContainer.module.scss'

type Props = ComponentPropsWithRef<'main'> & {
  mt?: CSSProperties['marginTop']
  direction?: 'row' | 'column'
}

export function PageContainer({ className, mt = '24px', direction, style, ref, ...rest }: Props) {
  const classNames = {
    page: clsx(className, s.container, direction === 'row' && s.row,
      direction === 'column' && s.column),
  }
  const styles: CSSProperties = { marginTop: mt, ...style }

  return <main ref={ref} className={classNames.page} style={styles} {...rest} />
}

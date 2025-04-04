import clsx from 'clsx'
import { ComponentPropsWithRef, CSSProperties, ElementType } from 'react'
import s from './PageContainer.module.scss'

type Props = ComponentPropsWithRef<'main'> & {
  mt?: CSSProperties['marginTop']
}

export const PageContainer = ({ className, mt = '24px', style, ref, ...rest }: Props) => {
  const classNames = {
    page: clsx(className, s.container),
  }
  const styles: CSSProperties = { marginTop: mt, ...style }

  return <main className={classNames.page} ref={ref} style={styles} {...rest} />
}

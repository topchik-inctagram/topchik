import clsx from 'clsx'
import { type ComponentPropsWithRef, type CSSProperties } from 'react'
import s from './PageContainer.module.scss'

type Props = ComponentPropsWithRef<'main'> & {
  mt?: CSSProperties['marginTop']
}

export const PageContainer = ({ className, mt = '24px', style, ref, ...rest }: Props) => {
  const classNames = {
    page: clsx(className, s.container),
  }
  const styles: CSSProperties = { marginTop: mt, ...style }

  return <main ref={ref} className={classNames.page} style={styles} {...rest} />
}

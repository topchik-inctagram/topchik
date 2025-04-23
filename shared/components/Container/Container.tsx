import type {ComponentPropsWithRef, CSSProperties, ElementType} from 'react';
import s from './Container.module.scss'
import clsx from 'clsx';

type Props<T extends ElementType = 'section'> =
    ComponentPropsWithRef<T> & {
    as?: T
    mt?: CSSProperties['marginTop']
    pr?: CSSProperties['paddingRight']
    pl?: CSSProperties['paddingLeft']
    direction?: 'row' | 'column'
    maxWidth?: string
}

export function Container<T extends ElementType = 'section'> ({
  children, className,
  direction, mt, pr, pl,
  maxWidth, style, ref, as, ...rest}: Props<T>) {

  const Component = as || 'section'

  const classNames = {
    container: clsx(className, s.container, direction === 'row' && s.row,
      direction === 'column' && s.column),
  }
  const styles: CSSProperties = {
    marginTop: mt,
    paddingRight: pr,
    paddingLeft: pl,
    maxWidth: maxWidth,
    ...style }

    
  return <Component ref={ref}
    className={classNames.container}
    style={styles} {...rest}>{children}</Component>

}

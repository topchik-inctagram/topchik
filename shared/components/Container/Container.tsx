import type {ComponentPropsWithRef, CSSProperties, ElementType} from 'react';
import s from './Container.module.scss'
import clsx from 'clsx';

type Props<T extends ElementType = 'section'> =
    ComponentPropsWithRef<T> & {
    as?: T
    marginTop?: CSSProperties['marginTop']
    paddingRight?: CSSProperties['paddingRight']
    paddingLeft?: CSSProperties['paddingLeft']
    direction?: 'row' | 'column'
    maxWidth?: string
}

export function Container<T extends ElementType = 'section'> ({
  children, className,
  direction, marginTop, paddingRight, paddingLeft,
  maxWidth, style, ref, as, ...rest}: Props<T>) {

  const Component = as || 'section'

  const classNames = {
    container: clsx(className, s.container, direction === 'row' && s.row,
      direction === 'column' && s.column),
  }
  const styles: CSSProperties = {
    marginTop: paddingRight,
    paddingRight: paddingRight,
    paddingLeft: paddingLeft,
    maxWidth: maxWidth,
    ...style }

    
  return <Component ref={ref}
    className={classNames.container}
    style={styles} {...rest}>{children}</Component>

}

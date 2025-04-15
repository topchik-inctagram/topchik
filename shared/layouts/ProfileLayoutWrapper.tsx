import { type ReactNode } from 'react'
import s from './ProfileLayoutWrapper.module.scss'

export const ProfileLayoutWrapper = ({ children }: { children: ReactNode }) => {
  return <div className={s.wrapper}>{children}</div>
}
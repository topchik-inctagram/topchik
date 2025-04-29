import Image from 'next/image'
import type { ComponentPropsWithRef } from 'react'
import { clsx } from 'clsx'
import s from './UserSmallPhoto.module.scss'

export type UserSmallPhotoProps = ComponentPropsWithRef<typeof Image>
export const UserSmallPhoto = ({ className, alt, ...rest }: UserSmallPhotoProps) => {
  return <Image alt={alt} className={clsx(s.authorPhoto, className)} {...rest} />
}

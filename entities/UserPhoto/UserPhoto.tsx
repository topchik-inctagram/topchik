import Image from 'next/image'
import type { ComponentPropsWithRef } from 'react'
import { clsx } from 'clsx'
import s from './UserPhoto.module.scss'

type Props = ComponentPropsWithRef<typeof Image>
export const UserPhoto = ({ className, ...rest }: Props) => {
  return <Image className={clsx(s.authorPhoto, className)} {...rest} />
}

import { UserSmallPhoto } from '@/entities/UserSmallPhoto'
import type { StaticImageData } from 'next/image'
import { Typography } from '@/shared/components'
import s from './PostLikesAndShareBar.module.scss'
import clsx from 'clsx'

export type PostLikesAndShareBarProps = {
  likeAuthorImage: StaticImageData
  postCreateDate: string
  likesCount: number
}
//| StaticImageData[]

export const PostLikesAndShareBar = ({
  likesCount,
  likeAuthorImage,
  postCreateDate,
}: PostLikesAndShareBarProps) => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.likeContainer}>
          <UserSmallPhoto
            alt="a"
            className={clsx(s.likePhoto, s.firstLikePhoto)}
            src={likeAuthorImage}
          />
          <UserSmallPhoto
            alt="a"
            className={clsx(s.likePhoto, s.secondLikePhoto)}
            src={likeAuthorImage}
          />
          <UserSmallPhoto
            alt="a"
            className={clsx(s.likePhoto, s.thirdLikePhoto)}
            src={likeAuthorImage}
          />
        </div>
        <span className={s.likeCountContainer}>
          <Typography as="span" variant="regular_14">
            {likesCount}
          </Typography>
          <Typography as="span" variant="bold_14">
            &#34;Like&#34;
          </Typography>
        </span>
      </div>
      <Typography as="span" className={s.postCreateDate} variant="small">
        {postCreateDate}
      </Typography>
    </div>
  )
}

import { UserSmallPhoto } from '@/entities/UserSmallPhoto'
import type { StaticImageData } from 'next/image'
import { Typography } from '@/shared/components'

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
    <div>
      <UserSmallPhoto alt="a" src={likeAuthorImage} />
      <UserSmallPhoto alt="a" src={likeAuthorImage} />
      <UserSmallPhoto alt="a" src={likeAuthorImage} />
      <Typography as="span" variant="regular_14">
        {likesCount}
      </Typography>
      <Typography as="span" variant="bold_14">
        &#34;Like&#34;
      </Typography>
      <Typography as="span" variant="small">
        {postCreateDate}
      </Typography>
    </div>
  )
}

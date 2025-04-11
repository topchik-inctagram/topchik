import Image, { type StaticImageData } from 'next/image'
import s from './PostCard.module.scss'
import { Typography } from '@/shared/components'
import { useState } from 'react'

type Props = {
  postImage: StaticImageData
  authorImage: StaticImageData
  postTitle: string
  postCreated: string
  postText: string
}

export const PostCard = ({ postText, postCreated, postImage, postTitle, authorImage }: Props) => {
  const [showMoreButton, setShowMoreButton] = useState(false)
  const postTextCut = postText.length > 82 ? postText.slice(0, 83) + '...' : postText
  const [postTextToDisplay, setPostTextToDisplay] = useState(postTextCut)
  const postTextTooLong = postText.length > 82

  const showMoreButtonHandler = () => {
    setShowMoreButton(!showMoreButton)
    if (postTextToDisplay.length < 90) {
      setPostTextToDisplay(postText.length > 233 ? postText.slice(0, 233) + '...' : postText)
    } else {
      setPostTextToDisplay(postText.length > 82 ? postText.slice(0, 83) + '...' : postText)
    }
  }

  return (
    <section className={s.container}>
      <Image alt="post image" className={s.postPhoto} src={postImage} />
      <div className={s.postContainer}>
        <div className={s.imageContainer}>
          <Image alt="author photo" className={s.authorPhoto} src={authorImage} />
          <Typography variant="h3">{postTitle}</Typography>
        </div>
        <Typography className={s.createdDate} variant="small">
          {postCreated}
        </Typography>
        <Typography className={s.postText} variant="regular_14">
          {postTextToDisplay}
          {postTextTooLong && (
            <button className={s.showMoreButton} onClick={showMoreButtonHandler}>
              <Typography as="span" variant="regular_14">
                {showMoreButton ? 'Hide' : 'Show more'}
              </Typography>
            </button>
          )}
        </Typography>
      </div>
    </section>
  )
}

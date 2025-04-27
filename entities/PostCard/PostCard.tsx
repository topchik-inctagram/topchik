import Image, { type StaticImageData } from 'next/image'
import s from './PostCard.module.scss'
import { Typography } from '@/shared/components'
import { useState } from 'react'
import { ArrowIosBackOutline, ArrowIosForwardOutline } from '@/public/icons'
import useEmblaCarousel from 'embla-carousel-react'
import { usePrevNextButtons, useDotButton } from '@/shared/hooks/embla-carousel'
import { clsx } from 'clsx'
import { UserSmallPhoto } from '@/entities/UserSmallPhoto'
import { UserProfileLink } from '@/entities/UserProfileLink'
type Props = {
  postImage: StaticImageData | StaticImageData[]
  authorImage: StaticImageData
  postAuthor: string
  postCreated: string
  postText: string
}

export const PostCard = ({ postText, postCreated, postImage, postAuthor, authorImage }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

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
      {Array.isArray(postImage) ? (
        <div ref={emblaRef} className={s.embla__viewport}>
          <div className={s.embla__container}>
            {postImage.map((t, i) => (
              <Image key={i} alt="post image" className={s.postPhoto} src={t} />
            ))}
          </div>
        </div>
      ) : (
        <Image alt="post image" className={s.postPhoto} src={postImage} />
      )}
      {Array.isArray(postImage) && (
        <div className={s.embla__controls}>
          <div className={s.embla__buttons}>
            <button
              className={clsx(s.embla__buttons, s.embla__button)}
              disabled={prevBtnDisabled}
              type="button"
              onClick={onPrevButtonClick}
            >
              <ArrowIosBackOutline />
            </button>
            <button
              className={clsx(s.embla__buttons, s.embla__button)}
              disabled={nextBtnDisabled}
              type="button"
              onClick={onNextButtonClick}
            >
              <ArrowIosForwardOutline />
            </button>
          </div>
        </div>
      )}
      {Array.isArray(postImage) && (
        <div className={s.embla__dots}>
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={clsx(s.embla__dot, index === selectedIndex && s.embla__dot__selected)}
              type="button"
              onClick={() => onDotButtonClick(index)}
            />
          ))}
        </div>
      )}

      <div className={s.postContainer}>
        <div className={s.imageContainer}>
          <UserSmallPhoto alt="author photo" src={authorImage} />
          <UserProfileLink href="#" userName={postAuthor} />
        </div>
        <Typography className={s.createdDate} variant="small">
          {postCreated}
        </Typography>
        <Typography className={s.postText} variant="regular_14">
          {postTextToDisplay}
          {postTextTooLong && (
            <Typography
              as="button"
              className={s.showMoreButton}
              type="button"
              variant="regular_14"
              onClick={showMoreButtonHandler}
            >
              {showMoreButton ? 'Hide' : 'Show more'}
            </Typography>
          )}
        </Typography>
      </div>
    </section>
  )
}

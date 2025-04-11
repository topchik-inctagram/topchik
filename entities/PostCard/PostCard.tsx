import Image, { type StaticImageData } from 'next/image'
import s from './PostCard.module.scss'
import { Typography } from '@/shared/components'
import { useState } from 'react'
import { ArrowIosBackOutline, ArrowIosForwardOutline } from '@/public/icons'
import useEmblaCarousel from 'embla-carousel-react'
import { usePrevNextButtons } from '@/entities/PostCard/usePrevNextButton'
import { DotButton, useDotButton } from '@/entities/PostCard/useDotButton'
import { clsx } from 'clsx'
type Props = {
  postImage: StaticImageData | StaticImageData[]
  authorImage: StaticImageData
  postTitle: string
  postCreated: string
  postText: string
}

export const PostCard = ({ postText, postCreated, postImage, postTitle, authorImage }: Props) => {
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
      <div className={s.embla__dots}>
        {Array.isArray(postImage) &&
          scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              className={clsx(s.embla__dot, index === selectedIndex && s.embla__dot__selected)}
              onClick={() => onDotButtonClick(index)}
            />
          ))}
      </div>

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
            <button className={s.showMoreButton} type="button" onClick={showMoreButtonHandler}>
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

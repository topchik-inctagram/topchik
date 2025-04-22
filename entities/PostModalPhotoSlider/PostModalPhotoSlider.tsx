import useEmblaCarousel from 'embla-carousel-react'
import { usePrevNextButtons } from '@/entities/PostCard/usePrevNextButton'
import { useDotButton } from '@/entities/PostCard/useDotButton'
import s from './PostModalPhotoSlider.module.scss'
import Image, { type StaticImageData } from 'next/image'
import clsx from 'clsx'
import { ArrowIosBackOutline, ArrowIosForwardOutline } from '@/public/icons'

export type PostModalPhotoSliderProps = {
  photoContent: StaticImageData | StaticImageData[]
}

export const PostModalPhotoSlider = ({ photoContent }: PostModalPhotoSliderProps) => {
  const classNames = {
    photoContent: s.photoContent,
  }

  const [emblaRef, emblaApi] = useEmblaCarousel()

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  return (
    <div className={classNames.photoContent}>
      {Array.isArray(photoContent) ? (
        <div ref={emblaRef} className={s.embla__viewport}>
          <div className={s.embla__container}>
            {photoContent.map((t, i) => (
              <Image key={i} alt="post image" className={s.postPhoto} src={t} />
            ))}
          </div>
        </div>
      ) : (
        <Image alt="post image" className={s.postPhoto} src={photoContent} />
      )}

      {Array.isArray(photoContent) && (
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
      {Array.isArray(photoContent) && (
        <div className={s.dots_container}>
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
        </div>
      )}
    </div>
  )
}

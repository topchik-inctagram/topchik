import * as Dialog from '@radix-ui/react-dialog'
import s from './Modal.module.scss'
import { type ComponentPropsWithRef } from 'react'
import clsx from 'clsx'
import { ArrowIosBackOutline, ArrowIosForwardOutline, CloseOutline } from '@/public/icons'
import { Typography } from '@/shared/components'
import Image, { type StaticImageData } from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { usePrevNextButtons } from '@/entities/PostCard/usePrevNextButton'
import { useDotButton } from '@/entities/PostCard/useDotButton'

type ModalSize = 'lg' | 'md' | 'sm'

type Props = {
  title: string
  size?: ModalSize
  className?: string
  withPhoto?: boolean
  photoContent: StaticImageData | StaticImageData[]
} & ComponentPropsWithRef<typeof Dialog.Root>

export const Modal = ({
  title,
  onOpenChange,
  children,
  open,
  size = 'sm',
  withPhoto,
  className,
  photoContent,
  ...rest
}: Props) => {
  const classNames = {
    overlay: s.overlay,
    content: clsx(s.content, s[size], className, withPhoto && s.withPhotoContent),
    header: s.modalHeader,
    title: s.title,
    icon: s.icon,
    body: s.modalBody,
    photoContent: s.photoContent,
    closeButton: withPhoto ? s.closeButton : '',
  }

  const [emblaRef, emblaApi] = useEmblaCarousel()
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} {...rest}>
      <Dialog.Portal>
        <Dialog.Overlay className={classNames.overlay} />
        <Dialog.Content className={classNames.content}>
          <div className={classNames.header}>
            <Dialog.Title asChild className={classNames.title}>
              <Typography variant="h1">{title}</Typography>
            </Dialog.Title>
            <Dialog.Close className={classNames.closeButton}>
              <CloseOutline aria-label="Close" className={classNames.icon} />
            </Dialog.Close>
          </div>
          <hr />
          <div className={classNames.body}>{children}</div>
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
          </div>
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
                    className={clsx(
                      s.embla__dot,
                      index === selectedIndex && s.embla__dot__selected
                    )}
                    type="button"
                    onClick={() => onDotButtonClick(index)}
                  />
                ))}
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

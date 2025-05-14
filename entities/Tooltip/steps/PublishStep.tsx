import clsx from 'clsx'
import s from '../Tooltip.module.scss'
import { Input, Textarea, Typography } from '@/shared/components'
import { LeftArrow, RightArrow } from '@/public/icons'
import type { PublishProps } from '../types'

export const PublishStep = ({
  currentImage,
  currentImageIndex,
  images,
  description,
  location,
  username,
  avatarUrl,
  isLoading,
  onSelectImage,
  onNextImage,
  onPrevImage,
  onDescriptionChange,
  onLocationChange,
}: PublishProps) => {
  return (
    <div className={s.publishContainer}>
      <div className={s.imageColumn}>
        <img
          alt="Publication preview"
          className={s.publishImage}
          src={currentImage.url}
          style={{ filter: currentImage.filter ?? 'none' }}
        />
        {images.length > 1 && (
          <>
            {currentImageIndex > 0 && (
              <button className={s.leftArrowFilter} onClick={onPrevImage}>
                <LeftArrow />
              </button>
            )}
            {currentImageIndex < images.length - 1 && (
              <button className={s.rightArrowFilter} onClick={onNextImage}>
                <RightArrow />
              </button>
            )}
            <div className={s.imageDotsFilter}>
              {images.map((_, index) => (
                <div
                  key={index}
                  className={clsx(s.dotFilter, {
                    [s.activeDotFilter]: index === currentImageIndex,
                  })}
                  onClick={() => onSelectImage(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className={s.infoColumn}>
        <div className={s.userInfo}>
          <img alt="Avatar" className={s.avatar} src={avatarUrl || '/default-avatar.jpg'} />
          <Typography variant="small">{isLoading ? 'Loading' : username || 'Anonim'}</Typography>
        </div>

        <Textarea
          showCharacterCount
          className={s.description}
          label="Add publication descriptions"
          maxLength={500}
          style={{
            width: '433px',
            height: '120px',
          }}
          value={description}
          onChange={e => onDescriptionChange(e.target.value)}
        />

        <hr className={s.divider} />

        <div className={s.locationSection}>
          <Input
            className={s.inputWithLeftMargin}
            label="Add location"
            value={location}
            onChange={e => onLocationChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

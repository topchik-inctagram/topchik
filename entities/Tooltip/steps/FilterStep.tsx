import clsx from 'clsx'
import s from '../Tooltip.module.scss'
import { Typography } from '@/shared/components'
import { LeftArrow, RightArrow } from '@/public/icons'
import type { FilterProps } from '../types'
import Image from 'next/image'

export const FilterStep = ({
  currentImage,
  currentImageIndex,
  images,
  filters,
  onSelectImage,
  onNextImage,
  onPrevImage,
  onFilterChange,
}: FilterProps) => {
  return (
    <div className={s.filterContainer}>
      <div className={s.imagePreviewContainer}>
        {currentImageIndex > 0 && (
          <button className={s.leftArrowFilter} onClick={onPrevImage}>
            <LeftArrow />
          </button>
        )}
        <Image
          alt="Filtered preview"
          className={s.mainPreviewImage}
          height={0}
          src={currentImage.url}
          style={{ filter: currentImage.filter || 'none' }}
          width={0}
        />
        {currentImageIndex < images.length - 1 && (
          <button className={s.rightArrowFilter} onClick={onNextImage}>
            <RightArrow />
          </button>
        )}
        {images.length > 1 && (
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
        )}
      </div>

      <div className={s.filtersGrid}>
        {filters.map((filter, index) => (
          <div key={index} className={s.filterItem} onClick={() => onFilterChange(filter.value)}>
            <Image
              alt={`Thumbnail for ${filter.name}`}
              className={s.filterThumbnail}
              height={0}
              src={currentImage.url}
              style={{ filter: filter.value }}
              width={0}
            />
            <Typography className={s.filterName}>{filter.name}</Typography>
          </div>
        ))}
      </div>
    </div>
  )
}

// Tooltip/steps/CropStep.tsx
import ReactCrop from 'react-image-crop'
import clsx from 'clsx'
import s from '../Tooltip.module.scss'
import { Dropdown, DropdownItem, Input, Label } from '@/shared/components'
import {
  ExpandOutline,
  MaximizeOutline,
  Square,
  Rectangle,
  HorizontalRectangle,
  ImageOutline,
  LeftArrow,
  RightArrow,
  PlusCircleOutline,
  CloseOutline,
} from '@/public/icons'
import { type CropStepProps } from '../types'

export const CropStep = ({
  image,
  images,
  crop,
  zoom,
  aspectRatio,
  showCrop,
  currentImageIndex,
  onCropChange,
  onImageLoad,
  onZoomChange,
  onAspectRatioChange,
  onNextImage,
  onPrevImage,
  onSelectImage,
  onRemoveImage,
  showImageModal,
  toggleImageModal,
  setShowCrop,
  classNameBtnAddPhoto,
  onFileUploadClick,
  onFileChange,
  imgRef,
}: CropStepProps) => {
  return (
    <div className={s.aspectWrapper}>
      {!showCrop ? (
        <div>
          <img
            ref={imgRef}
            alt="Preview"
            className={s.fullSizeImage}
            crossOrigin="anonymous"
            src={image.originalUrl}
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
              transition: 'transform 0.2s ease-in-out',
            }}
            onLoad={onImageLoad}
          />
        </div>
      ) : (
        <ReactCrop
          aspect={
            aspectRatio === '1:1'
              ? 1
              : aspectRatio === '4:5'
                ? 4 / 5
                : aspectRatio === '16:9'
                  ? 16 / 9
                  : undefined
          }
          crop={crop}
          onChange={onCropChange}
        >
          <img
            ref={imgRef}
            alt="Preview"
            crossOrigin="anonymous"
            src={image.originalUrl}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
            }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}

      {/* Navigation arrows */}
      <div className={s.imageNavigation}>
        {currentImageIndex > 0 && (
          <button className={s.leftArrowCrop} onClick={onPrevImage}>
            <LeftArrow />
          </button>
        )}
        {currentImageIndex < images.length - 1 && (
          <button className={s.rightArrowCrop} onClick={onNextImage}>
            <RightArrow />
          </button>
        )}
        {images.length > 1 && (
          <div className={s.imageDotsCrop}>
            {images.map((_, index) => (
              <div
                key={index}
                className={clsx(s.dotCrop, {
                  [s.activeDotCrop]: index === currentImageIndex,
                })}
                onClick={() => {
                  onSelectImage(index)
                  setShowCrop(false)
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className={s.controlsGroup}>
        <div className={s.leftButtons}>
          <Dropdown
            align="start"
            className={s.dropdownCrops}
            trigger={
              <span className={s.btn}>
                <ExpandOutline className={s.icons} />
              </span>
            }
          >
            <DropdownItem
              className={s.dropdownItem}
              onClick={() => onAspectRatioChange('Original')}
            >
              <Label>Original</Label>
              <ImageOutline />
            </DropdownItem>
            <DropdownItem
              className={s.dropdownItem}
              onClick={() => {
                onAspectRatioChange('1:1')
              }}
            >
              <Label>1:1</Label>
              <Square />
            </DropdownItem>
            <DropdownItem className={s.dropdownItem} onClick={() => onAspectRatioChange('4:5')}>
              <Label>4:5</Label>
              <Rectangle />
            </DropdownItem>
            <DropdownItem className={s.dropdownItem} onClick={() => onAspectRatioChange('16:9')}>
              <Label>16:9</Label>
              <HorizontalRectangle />
            </DropdownItem>
          </Dropdown>

          <Dropdown
            align="start"
            className={s.dropdownZoom}
            trigger={
              <span className={s.btn}>
                <MaximizeOutline className={s.icons} />
              </span>
            }
          >
            <input
              className={s.zoomSlider}
              max="3"
              min="0.5"
              step="0.1"
              type="range"
              value={zoom}
              onChange={e => onZoomChange(parseFloat(e.target.value))}
            />
          </Dropdown>
        </div>

        <div>
          {showImageModal && (
            <div className={s.thumbnailModal}>
              <Input
                accept="image/jpeg,image/jpg,image/png,image/webp"
                id="file-upload"
                style={{ display: 'none' }}
                type="file"
                onChange={onFileChange}
              />
              <div className={s.thumbnailGrid}>
                {images.map((img, index) => (
                  <div key={img.id} className={s.thumbnailItem}>
                    <img
                      className={clsx(s.thumbnailImage, {
                        [s.selected]: index === currentImageIndex,
                      })}
                      src={img.url}
                      onClick={() => onSelectImage(index)}
                    />
                    <span
                      className={s.removeButton}
                      onClick={e => {
                        e.stopPropagation()
                        onRemoveImage(img.id)
                      }}
                    >
                      <CloseOutline />
                    </span>
                  </div>
                ))}
                <button className={s.addButtonPhoto} type="button" onClick={onFileUploadClick}>
                  <PlusCircleOutline />
                </button>
              </div>
            </div>
          )}
          <span className={classNameBtnAddPhoto} onClick={toggleImageModal}>
            <ImageOutline className={s.icons} />
          </span>
        </div>
      </div>
    </div>
  )
}

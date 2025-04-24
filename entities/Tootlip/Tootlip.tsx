import { clsx } from 'clsx'
import s from './Tootlip.module.scss'
import { Button, Dropdown, DropdownItem, Input, Modal, Typography } from '@/shared/components'
import { ImageOutline, ExpandOutline, MaximizeOutline, PlusCircleOutline } from '@/public/icons'
import { type ChangeEvent, useState } from 'react'
import HorizontalRectangle from './HorizontalRectangle'
import Rectangle from './Rectangle'
import Square from './Square'

type Props = {
  className?: string
  open: boolean
  onOpenChange: (open: boolean) => void
  isAuth?: boolean
  placeholder?: string
  onClose?: () => void
  onImageSelect?: (file: File) => void
}

type UploadedImage = {
  id: string
  url: string
  file: File
}

export const Tootlip = ({
  className,
  isAuth,
  placeholder,
  open,
  onOpenChange,
  onImageSelect,
}: Props) => {
  const [images, setImages] = useState<UploadedImage[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [aspectRatio, setAspectRatio] = useState<string>('Original')
  const [zoomLevel, setZoomLevel] = useState<number>(1)

  const classNames = {
    container: clsx(s.container, className, {
      [s.hasImage]: images.length > 0,
    }),
    placeholder: clsx(s.placeholder, className),
    imagePreview: clsx(s.imagePreview, className),
    iconButton: s.iconButton,
    controls: s.controls,
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) {
      return
    }

    const availableSlots = 10 - images.length
    if (availableSlots <= 0) {
      alert('Maximum 10 images allowed')
      return
    }

    const filesToUpload = Array.from(files).slice(0, availableSlots)
    const newImages: UploadedImage[] = []

    filesToUpload.forEach((file, index) => {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Please upload only JPEG or PNG images')
        return
      }

      if (file.size > 20 * 1024 * 1024) {
        alert('Image size should be less than 20MB')
        return
      }

      const reader = new FileReader()
      reader.onload = event => {
        const newImage = {
          id: Date.now() + index.toString(),
          url: event.target?.result as string,
          file: file,
        }
        newImages.push(newImage)

        if (index === filesToUpload.length - 1) {
          setImages(prev => [...prev, ...newImages])
          if (images.length === 0) {
            setCurrentImageIndex(0)
          }
          onImageSelect?.(file)
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleRemoveImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id))
    if (currentImageIndex >= images.length - 1) {
      setCurrentImageIndex(Math.max(0, images.length - 2))
    }
  }

  const handleAspectRatioChange = (ratio: string) => {
    setAspectRatio(ratio)
  }

  const handleZoomChange = (e: ChangeEvent<HTMLInputElement>) => {
    setZoomLevel(parseFloat(e.target.value))
  }

  const currentImage = images[currentImageIndex]?.url || null

  return (
    <Modal open={open} size="md" title="Add Photo" onOpenChange={onOpenChange}>
      <div className={classNames.container}>
        {currentImage ? (
          <>
            <div className={classNames.imagePreview}>
              <div className={s.aspectWrapper}>
                <img
                  alt="Preview"
                  src={currentImage}
                  style={{
                    aspectRatio:
                      aspectRatio === '1:1'
                        ? '1/1'
                        : aspectRatio === '4:5'
                        ? '4/5'
                        : aspectRatio === '16:9'
                        ? '16/9'
                        : 'initial',
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'center center',
                  }}
                />
              </div>
            </div>
            <div className={classNames.controls}>
              {isAuth && (
                <div className={s.group}>
                  {images.length > 1 && (
                    <Dropdown
                      align="start"
                      className={s.dropdown}
                      trigger={<Button className={s.btn} variant="languageButton"></Button>}
                    >
                      {images.map((img, index) => (
                        <DropdownItem
                          key={img.id}
                          className={s.dropdownItem}
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          <div className={s.thumbnailItem}>
                            <img
                              alt={`Thumbnail ${index + 1}`}
                              className={s.thumbnail}
                              src={img.url}
                            />
                          </div>
                        </DropdownItem>
                      ))}
                    </Dropdown>
                  )}

                  <Dropdown
                    align="start"
                    className={s.dropdown}
                    trigger={
                      <Button className={s.btn} variant="languageButton">
                        <ExpandOutline className={s.icons} />
                      </Button>
                    }
                  >
                    <DropdownItem
                      className={s.dropdownItem}
                      onClick={() => handleAspectRatioChange('Original')}
                    >
                      <Typography text="Оригинал" variant="h3" />
                      <ImageOutline />
                    </DropdownItem>
                    <DropdownItem
                      className={s.dropdownItem}
                      onClick={() => handleAspectRatioChange('1:1')}
                    >
                      <Typography text="1:1" variant="regular_16" />
                      <Square />
                    </DropdownItem>
                    <DropdownItem
                      className={s.dropdownItem}
                      onClick={() => handleAspectRatioChange('4:5')}
                    >
                      <Typography text="4:5" variant="regular_16" />
                      <Rectangle />
                    </DropdownItem>
                    <DropdownItem
                      className={s.dropdownItem}
                      onClick={() => handleAspectRatioChange('16:9')}
                    >
                      <Typography text="16:9" variant="regular_16" />
                      <HorizontalRectangle />
                    </DropdownItem>
                  </Dropdown>
                  <Dropdown
                    align="start"
                    className={s.dropdownZoom}
                    trigger={
                      <Button className={s.btn} variant="languageButton">
                        <MaximizeOutline className={s.icons} />
                      </Button>
                    }
                  >
                    <input
                      className={s.zoomSlider}
                      max="3"
                      min="0.5"
                      step="0.1"
                      type="range"
                      value={zoomLevel}
                      onChange={handleZoomChange}
                    />
                  </Dropdown>
                  <Dropdown
                    align="end"
                    className={s.dropdownAddimage}
                    trigger={
                      <Button className={s.btnimage} variant="languageButton">
                        <ImageOutline className={s.icons} />
                      </Button>
                    }
                  >
                    <div className={s.thumbnailsGrid}>
                      {images.map(img => (
                        <div key={img.id} className={s.thumbnailWrapper}>
                          <img
                            alt={`Thumbnail ${img.id}`}
                            className={s.thumbnail}
                            src={img.url}
                            onClick={() => {
                              const index = images.findIndex(i => i.id === img.id)
                              setCurrentImageIndex(index)
                            }}
                          />
                          <button
                            className={s.removeButton}
                            onClick={e => {
                              e.stopPropagation()
                              handleRemoveImage(img.id)
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {images.length < 10 && (
                        <Button
                          className={s.addButton}
                          variant="miniOutlined"
                          onClick={() => document.getElementById('file-upload')?.click()}
                        >
                          <PlusCircleOutline />
                        </Button>
                      )}
                    </div>
                  </Dropdown>
                  <Input
                    multiple
                    accept="image/jpeg,image/png"
                    id="file-upload"
                    style={{ display: 'none' }}
                    type="file"
                    onChange={handleImageUpload}
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {placeholder && (
              <div className={classNames.placeholder}>
                <ImageOutline className={s.img} fill="white" height={48} width={48} />
              </div>
            )}
            <div className={s.groupBtn}>
              <Input
                accept="image/jpeg,image/png"
                id="file-upload"
                style={{ display: 'none' }}
                type="file"
                onChange={handleImageUpload}
              />
              <Button
                variant="primary"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Select from Computer
              </Button>
              <Button variant="outlined">Open draft</Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

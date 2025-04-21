import { clsx } from 'clsx'
import s from './Tootlip.module.scss'
import { Button, Dropdown, DropdownItem, Input, Modal, Typography } from '@/shared/components'
import { ImageOutline, ExpandOutline, MaximizeOutline } from '@/public/icons'
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

export const Tootlip = ({
  className,
  isAuth,
  placeholder,
  open,
  onOpenChange,
  onImageSelect,
}: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [aspectRatio, setAspectRatio] = useState<string>('Original')
  const [zoomLevel, setZoomLevel] = useState<number>(1)

  const classNames = {
    container: clsx(s.container, className, {
      [s.hasImage]: selectedImage,
    }),
    placeholder: clsx(s.placeholder, className),
    imagePreview: clsx(s.imagePreview, className),
    iconButton: s.iconButton,
    controls: s.controls,
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }

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
      setSelectedImage(event.target?.result as string)
    }
    reader.readAsDataURL(file)

    onImageSelect?.(file)
  }

  const handleAspectRatioChange = (ratio: string) => {
    setAspectRatio(ratio)
  }

  const handleZoomChange = (e: ChangeEvent<HTMLInputElement>) => {
    setZoomLevel(parseFloat(e.target.value))
  }

  return (
    <Modal open={open} size="md" title="Add Photo" onOpenChange={onOpenChange}>
      <div className={classNames.container}>
        {selectedImage ? (
          <>
            <div className={classNames.imagePreview}>
              <div className={s.aspectWrapper}>
                <img
                  alt="Preview"
                  src={selectedImage}
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
                    <DropdownItem onClick={() => handleZoomChange(0.5)}>
                      <input
                        className={s.zoomSlider}
                        max="3"
                        min="0.5"
                        step="0.1"
                        type="range"
                        value={zoomLevel}
                        onChange={handleZoomChange}
                      />
                    </DropdownItem>
                  </Dropdown>
                  <Button
                    className={s.btnimage}
                    variant="languageButton"
                    onClick={() => setSelectedImage(null)}
                  >
                    <ImageOutline className={s.icons} />
                  </Button>
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

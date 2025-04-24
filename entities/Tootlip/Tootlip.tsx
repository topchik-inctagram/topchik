import { clsx } from 'clsx'
import s from './Tootlip.module.scss'
import {
  Button,
  Dropdown,
  DropdownItem,
  Input,
  ModalWrapper,
  Typography,
} from '@/shared/components'
import { ImageOutline, ExpandOutline, MaximizeOutline, PlusCircleOutline } from '@/public/icons'
import { type ChangeEvent, useState, useRef } from 'react'
import HorizontalRectangle from './HorizontalRectangle'
import Rectangle from './Rectangle'
import Square from './Square'
import ReactCrop, { type Crop } from 'react-image-crop'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import ImageFilter from 'react-image-filter'

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 10MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const imageSchema = z
  .instanceof(File)
  .refine(
    file => ACCEPTED_IMAGE_TYPES.includes(file.type),
    'Поддерживаются только форматы .jpg, .jpeg, .png и .webp'
  )
  .refine(file => file.size <= MAX_FILE_SIZE, 'Максимальный размер изображения - 10MB')

const formSchema = z.object({
  images: z.array(imageSchema).max(10, 'Максимум 10 изображений'),
})

type FormValues = z.infer<typeof formSchema>

type UploadedImage = {
  id: string
  url: string
  file: File
  filter?: string
  crop?: Crop
}

type Props = {
  className?: string
  open: boolean
  onClose: () => void
  isAuth?: boolean
  placeholder?: string
  onImageSelect?: (file: File) => void
}

export const Tootlip = ({
  className,
  isAuth,
  placeholder,
  open,
  onClose,
  onImageSelect,
}: Props) => {
  const [images, setImages] = useState<UploadedImage[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [aspectRatio, setAspectRatio] = useState<string>('Original')
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [crop, setCrop] = useState<Crop>()
  const [showFilters, setShowFilters] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  const {
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: [],
    },
  })

  const classNames = {
    container: clsx(s.container, className, {
      [s.hasImage]: images.length > 0,
    }),
    placeholder: clsx(s.placeholder, className),
    imagePreview: clsx(s.imagePreview, className),
    iconButton: s.iconButton,
    controls: s.controls,
  }

  const filters = [
    { name: 'Normal', filter: '' },
    { name: 'Clarendon', filter: 'clarendon' },
    { name: 'Lark', filter: 'lark' },
    { name: 'Gingham', filter: 'gingham' },
    { name: 'Moon', filter: 'moon' },
  ]

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) {
      return
    }

    const availableSlots = 10 - images.length
    if (availableSlots <= 0) {
      alert('Максимум 10 изображений')
      return
    }

    const filesToUpload = Array.from(files).slice(0, availableSlots)
    const newImages: UploadedImage[] = []

    for (const file of filesToUpload) {
      try {
        const validationResult = imageSchema.safeParse(file)
        if (!validationResult.success) {
          alert(validationResult.error.errors[0].message)
          continue
        }

        const reader = new FileReader()
        reader.onload = event => {
          const newImage = {
            id: Date.now() + Math.random().toString(),
            url: event.target?.result as string,
            file: file,
          }
          newImages.push(newImage)

          if (newImages.length === filesToUpload.length) {
            setImages(prev => [...prev, ...newImages])
            if (images.length === 0) {
              setCurrentImageIndex(0)
            }
            onImageSelect?.(file)
          }
        }
        reader.readAsDataURL(file)
      } catch (error) {
        console.error('Ошибка загрузки:', error)
      }
    }
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

  const handleApplyCrop = () => {
    if (!crop || !imgRef.current) {
      return
    }

    const currentImage = images[currentImageIndex]
    const canvas = document.createElement('canvas')
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height

    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

    if (ctx) {
      ctx.drawImage(
        imgRef.current,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      )

      const croppedUrl = canvas.toDataURL('image/jpeg')
      const updatedImages = [...images]
      updatedImages[currentImageIndex] = {
        ...currentImage,
        url: croppedUrl,
        crop,
      }
      setImages(updatedImages)
    }
  }

  const handleApplyFilter = (filter: string) => {
    const updatedImages = [...images]
    updatedImages[currentImageIndex] = {
      ...updatedImages[currentImageIndex],
      filter,
    }
    setImages(updatedImages)
  }

  const currentImage = images[currentImageIndex]

  return (
    <ModalWrapper open={open} size="md" title="Добавить фото" onClose={onClose}>
      <div className={classNames.container}>
        {currentImage ? (
          <>
            <div className={classNames.imagePreview}>
              <div className={s.aspectWrapper}>
                {showFilters ? (
                  <ImageFilter
                    filter={currentImage.filter || ''}
                    image={currentImage.url}
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
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
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
                    onChange={c => setCrop(c)}
                  >
                    <img
                      ref={imgRef}
                      alt="Превью"
                      src={currentImage.url}
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
                  </ReactCrop>
                )}
              </div>
            </div>

            {showFilters && (
              <div className={s.filtersContainer}>
                {filters.map(({ name, filter }) => (
                  <Button
                    key={name}
                    variant={currentImage.filter === filter ? 'primary' : 'outlined'}
                    onClick={() => handleApplyFilter(filter)}
                  >
                    {name}
                  </Button>
                ))}
              </div>
            )}

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
                              alt={`Миниатюра ${index + 1}`}
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

                  <Button className={s.btn} variant="languageButton" onClick={handleApplyCrop}>
                    Применить кадрирование
                  </Button>

                  <Button
                    className={s.btn}
                    variant="languageButton"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
                  </Button>

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
                            alt={`Миниатюра ${img.id}`}
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
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    id="file-upload"
                    style={{ display: 'none' }}
                    type="file"
                    onChange={handleImageUpload}
                  />
                  {errors.images && (
                    <Typography color="error" variant="medium_14">
                      {errors.images.message}
                    </Typography>
                  )}
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
                accept="image/jpeg,image/jpg,image/png,image/webp"
                id="file-upload"
                style={{ display: 'none' }}
                type="file"
                onChange={handleImageUpload}
              />
              <Button
                variant="primary"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Выбрать с компьютера
              </Button>
              <Button variant="outlined">Открыть черновик</Button>
              {errors.images && (
                <Typography color="error" variant="medium_14">
                  {errors.images.message}
                </Typography>
              )}
            </div>
          </>
        )}
      </div>
    </ModalWrapper>
  )
}

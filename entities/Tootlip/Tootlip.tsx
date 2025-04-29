import { clsx } from 'clsx'
import s from './Tootlip.module.scss'
import {
  Button,
  Dropdown,
  DropdownItem,
  Input,
  Label,
  Textarea,
  Typography,
} from '@/shared/components'
import {
  ImageOutline,
  ExpandOutline,
  MaximizeOutline,
  PlusCircleOutline,
  ArrowIosBack,
  CloseOutline,
} from '@/public/icons'
import { type ChangeEvent, useState, useRef, useCallback, useEffect } from 'react'
import HorizontalRectangle from './HorizontalRectangle'
import Rectangle from './Rectangle'
import Square from './Square'
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import ImageFilter from 'react-image-filter'
import { TootlipModals } from './TootlipModals/TootlipModals'
import { PinturaEditor } from '@pqina/react-pintura'
import { getEditorDefaults } from '@pqina/pintura'

const MAX_FILE_SIZE = 20 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const imageSchema = z
  .instanceof(File)
  .refine(
    file => ACCEPTED_IMAGE_TYPES.includes(file.type),
    'Поддерживаются только форматы .jpg, .jpeg, .png и .webp'
  )
  .refine(file => file.size <= MAX_FILE_SIZE, 'Максимальный размер изображения - 20MB')

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
  completedCrop?: Crop
}

type Props = {
  className?: string
  open: boolean
  onClose: () => void
  isAuth?: boolean
  placeholder?: string
  onImageSelect?: (file: File) => void
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}

export const Tootlip = ({ className, placeholder, open, onClose, onImageSelect }: Props) => {
  const [images, setImages] = useState<UploadedImage[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [aspectRatio, setAspectRatio] = useState<string>('Original')
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [crop, setCrop] = useState<Crop>()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const [shouldApplyCrop, setShouldApplyCrop] = useState(false)
  const [showCrop, setShowCrop] = useState(false)
  const [step, setStep] = useState<'add' | 'crop' | 'filter' | 'publish'>('add')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')

  const {
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: [],
    },
  })

  const SafeImageFilter = ({
    filter,
    image,
    className,
  }: {
    filter?: number[]
    image: string
    className?: string
  }) => {
    try {
      if (!filter) {
        return <img alt="Preview" className={className} src={image} />
      }
      return <ImageFilter className={className} filter={filter} image={image} />
    } catch (error) {
      console.error('Ошибка применения фильтра:', error)
      return <img alt="Error filter" className={className} src={image} />
    }
  }

  const filters = [
    { name: 'Normal', value: undefined },
    { name: 'Clarendon', value: [1.2, 0.9, 1.1, 0, 0] },
    { name: 'Lark', value: [1, 1.1, 1.3, 0, 0] },
    { name: 'Gingham', value: [1, 0.9, 1, 0.3, 0.2] },
    { name: 'Moon', value: [1, 1, 0.7, 0, 1] },
    { name: 'Juno', value: [1, 0.8, 0.6, 0, 0.2] },
    { name: 'Slumber', value: [1, 1.1, 1.2, 0, 0.3] },
    { name: 'Crema', value: [1.1, 1, 1, 0, 0] },
    { name: 'Ludwig', value: [1, 1.05, 1, 0, 0.1] },
  ]

  useEffect(() => {
    if (open) {
      setStep('add')
      setImages([])
      setCurrentImageIndex(0)
      setDescription('')
      setLocation('')
    }
  }, [open])

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
              setStep('crop')
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
    if (images.length === 1) {
      setStep('add')
    }
  }

  const handleAspectRatioChange = async (ratio: string) => {
    setAspectRatio(ratio)
    setShowCrop(true)

    if (imgRef.current && ratio !== 'Original') {
      const aspect = ratio === '1:1' ? 1 : ratio === '4:5' ? 4 / 5 : 16 / 9
      const newCrop = centerAspectCrop(imgRef.current.width, imgRef.current.height, aspect)
      setCrop(newCrop)

      await new Promise(resolve => setTimeout(resolve, 100))
      handleApplyCrop()
    } else {
      setCrop(undefined)
      setShowCrop(false)
    }
  }

  const handleZoomChange = (e: ChangeEvent<HTMLInputElement>) => {
    setZoomLevel(parseFloat(e.target.value))
  }

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      if (aspectRatio !== 'Original' && shouldApplyCrop) {
        const aspect = aspectRatio === '1:1' ? 1 : aspectRatio === '4:5' ? 4 / 5 : 16 / 9
        const newCrop = centerAspectCrop(e.currentTarget.width, e.currentTarget.height, aspect)
        setCrop(newCrop)
      }
    },
    [aspectRatio, shouldApplyCrop]
  )

  const handleApplyCrop = useCallback(() => {
    if (!crop || !imgRef.current || !previewCanvasRef.current) {
      return
    }

    const image = imgRef.current
    const canvas = previewCanvasRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx || !image.complete) {
      return
    }

    canvas.width = crop.width
    canvas.height = crop.height
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    // Получаем обрезанное изображение
    const croppedUrl = canvas.toDataURL('image/jpeg', 0.9)

    // Обновляем состояние
    setImages(prev =>
      prev.map((img, index) =>
        index === currentImageIndex ? { ...img, url: croppedUrl, completedCrop: crop } : img
      )
    )
  }, [crop, currentImageIndex])

  const renderHeader = () => {
    switch (step) {
      case 'add':
        return (
          <div className={s.stepHeader}>
            <Typography className={s.titleAdd} variant="h1">
              Add Photo
            </Typography>
            <button className={s.closeButton} onClick={onClose}>
              <CloseOutline />
            </button>
          </div>
        )
      case 'crop':
        return (
          <div className={s.stepHeader}>
            <button className={s.backButton} onClick={() => setStep('add')}>
              <ArrowIosBack />
            </button>
            <Typography className={s.stepTitle} variant="h1">
              Cropping
            </Typography>
            <button
              className={s.nextButton}
              onClick={() => {
                handleApplyCrop()
                setStep('filter')
              }}
            >
              Next
            </button>
          </div>
        )
      case 'filter':
        return (
          <div className={s.stepHeader}>
            <button className={s.backButton} onClick={() => setStep('crop')}>
              <ArrowIosBack />
            </button>
            <Typography className={s.stepTitle} variant="h1">
              Filters
            </Typography>
            <button className={s.nextButton} onClick={() => setStep('publish')}>
              Next
            </button>
          </div>
        )
      case 'publish':
        return (
          <div className={s.stepHeader}>
            <button className={s.backButton} onClick={() => setStep('filter')}>
              <ArrowIosBack />
            </button>
            <Typography className={s.stepTitle} variant="h1">
              Publish
            </Typography>
            <button className={s.nextButton} onClick={() => {}}>
              Publish
            </button>
          </div>
        )
      default:
        return 'add'
    }
  }

  const currentImage = images[currentImageIndex]

  const classNames = {
    container: clsx(s.container, className, {
      [s.hasImage]: images.length > 0,
    }),
    placeholder: clsx(s.placeholder, className),
    imagePreview: clsx(s.imagePreview, className),
    iconButton: s.iconButton,
    controls: s.controls,
  }

  return (
    <TootlipModals open={open} size="lg" title={renderHeader()} onClose={onClose}>
      <div className={classNames.container}>
        {step === 'add' ? (
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
                Select from Computer
              </Button>
              <Button variant="outlined">Open Draft</Button>
              {errors.images && (
                <Typography color="error" variant="medium_14">
                  {errors.images.message}
                </Typography>
              )}
            </div>
          </>
        ) : currentImage ? (
          <>
            {step === 'crop' && (
              <div className={classNames.imagePreview}>
                <div className={s.aspectWrapper}>
                  {!showCrop ? (
                    <img
                      ref={imgRef}
                      alt="Preview"
                      src={currentImage.url}
                      style={{
                        transform: `scale(${zoomLevel})`,
                        transformOrigin: 'center center',
                        maxWidth: '100%',
                        maxHeight: '100%',
                      }}
                      onLoad={onImageLoad}
                    />
                  ) : (
                    <ReactCrop
                      ruleOfThirds
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
                      minHeight={100}
                      minWidth={100}
                      onChange={c => setCrop(c)}
                    >
                      <img
                        ref={imgRef}
                        alt="Preview"
                        className={s.fullSizeImage}
                        src={currentImage.url}
                        onLoad={onImageLoad}
                      />
                    </ReactCrop>
                  )}
                  <div className={s.controlsGroup}>
                    <Dropdown
                      align="start"
                      className={s.dropdownCrops}
                      trigger={
                        <button className={s.btn}>
                          <ExpandOutline className={s.icons} />
                        </button>
                      }
                    >
                      <DropdownItem
                        className={s.dropdownItem}
                        onClick={() => handleAspectRatioChange('Original')}
                      >
                        <Label>Original</Label>
                        <ImageOutline />
                      </DropdownItem>
                      <DropdownItem
                        className={s.dropdownItem}
                        onClick={() => handleAspectRatioChange('1:1')}
                      >
                        <Label>1:1</Label>
                        <Square />
                      </DropdownItem>
                      <DropdownItem
                        className={s.dropdownItem}
                        onClick={() => handleAspectRatioChange('4:5')}
                      >
                        <Label>4:5</Label>
                        <Rectangle />
                      </DropdownItem>
                      <DropdownItem
                        className={s.dropdownItem}
                        onClick={() => handleAspectRatioChange('16:9')}
                      >
                        <Label>16:9</Label>
                        <HorizontalRectangle />
                      </DropdownItem>
                      <DropdownItem className={s.dropdownItem} onClick={() => setShowCrop(true)}>
                        <Label>Обрезать</Label>
                      </DropdownItem>
                    </Dropdown>
                    <Dropdown
                      align="start"
                      className={s.dropdownZoom}
                      trigger={
                        <button className={s.btn}>
                          <MaximizeOutline className={s.icons} />
                        </button>
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
                        <button className={s.btn}>
                          <ImageOutline className={s.icons} />
                        </button>
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
                                setPreviewUrl(null)
                                setShowCrop(false)
                              }}
                            />
                            <button
                              className={s.removeButton}
                              onClick={e => {
                                e.stopPropagation()
                                handleRemoveImage(img.id)
                              }}
                            >
                              x
                            </button>
                          </div>
                        ))}
                        {images.length < 10 && (
                          <Button
                            className={s.addButtonPhoto}
                            variant="miniOutlined"
                            onClick={() => document.getElementById('file-upload')?.click()}
                          >
                            <PlusCircleOutline />
                            <Input
                              accept="image/jpeg,image/jpg,image/png,image/webp"
                              id="file-upload"
                              style={{ display: 'none' }}
                              type="file"
                              onChange={handleImageUpload}
                            />
                          </Button>
                        )}
                      </div>
                    </Dropdown>
                  </div>
                </div>
              </div>
            )}

            {step === 'filter' && (
              <div className={s.filterContainer}>
                <div className={s.imagePreviewContainer}>
                  <SafeImageFilter
                    className={s.mainPreviewImage}
                    filter={currentImage.filter}
                    image={currentImage.url}
                  />
                </div>
                <div className={s.filtersGrid}>
                  {filters.map((filter, index) => (
                    <div
                      key={index}
                      className={s.filterItem}
                      onClick={() => {
                        setImages(prev =>
                          prev.map((img, idx) =>
                            idx === currentImageIndex ? { ...img, filter: filter.value } : img
                          )
                        )
                      }}
                    >
                      <SafeImageFilter
                        className={s.filterThumbnail}
                        filter={filter.value}
                        image={currentImage.url}
                      />
                      <Typography className={s.filterName}>{filter.name}</Typography>
                    </div>
                  ))}

                  {/* Дублируем некоторые фильтры для заполнения 9 ячеек */}
                  {[...filters].slice(0, 4).map((filter, index) => (
                    <div
                      key={`duplicate-${index}`}
                      className={s.filterItem}
                      onClick={() => {
                        setImages(prev =>
                          prev.map((img, idx) =>
                            idx === currentImageIndex ? { ...img, filter: filter.value } : img
                          )
                        )
                      }}
                    >
                      <SafeImageFilter
                        className={s.filterThumbnail}
                        filter={filter.value}
                        image={currentImage.url}
                      />
                      <Typography className={s.filterName}>{filter.name} (2)</Typography>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 'publish' && (
              <div className={s.containerPublish}>
                {/* Левая колонка с изображением */}
                <div className={s.imageColumn}>
                  {currentImage && (
                    <img
                      alt="Publication preview"
                      className={s.publishImage}
                      src={currentImage.url}
                    />
                  )}
                </div>
                <div className={s.infoColumn}>
                  <div className={s.userInfo}>
                    <img alt="User avatar" className={s.avatar} src="/default-avatar.jpg" />
                    <Typography variant="small_link">Your profile</Typography>
                  </div>

                  <Textarea
                    className={s.description}
                    placeholder="Add publication descriptions"
                    title="Add publication descriptions"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />

                  <hr className={s.divider} />

                  <div className={s.locationSection}>
                    <Typography className={s.locationTitle} variant="h3">
                      Add location
                    </Typography>
                    <div className={s.locationList}>
                      {[
                        'New York',
                        'Washington Square Park',
                        'New York',
                        'Washington Square Park',
                      ].map((loc, index) => (
                        <div
                          key={index}
                          className={s.locationItem}
                          onClick={() => setLocation(loc)}
                        >
                          {loc}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          'add'
        )}
      </div>
    </TootlipModals>
  )
}

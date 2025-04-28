import { clsx } from 'clsx'
import s from './Tootlip.module.scss'
import { Button, Dropdown, DropdownItem, Input, Textarea, Typography } from '@/shared/components'
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
import { Swiper, SwiperSlide } from 'swiper/react'

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

const SafeImageFilter = ({ filter, image }: { filter?: string; image: string }) => {
  try {
    if (!filter) {
      return <img alt="Preview" className={s.filterPreview} src={image} />
    }
    return <ImageFilter className={s.filterPreview} filter={filter} image={image} />
  } catch (error) {
    console.error('Error applying filter:', error)
    return <img alt="Filter error" className={s.filterPreview} src={image} />
  }
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

  const filters = [
    { name: 'Normal', value: undefined },
    { name: 'Clarendon', value: 'clarendon' },
    { name: 'Lark', value: 'lark' },
    { name: 'Gingham', value: 'gingham' },
    { name: 'Moon', value: 'moon' },
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

  const handleAspectRatioChange = (ratio: string) => {
    setAspectRatio(ratio)
    setShouldApplyCrop(false)
    if (imgRef.current && ratio !== 'Original') {
      const aspect = ratio === '1:1' ? 1 : ratio === '4:5' ? 4 / 5 : 16 / 9
      const newCrop = centerAspectCrop(imgRef.current.width, imgRef.current.height, aspect)
      setCrop(newCrop)
    } else {
      setCrop(undefined)
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

    const scaleX = imgRef.current.naturalWidth / imgRef.current.width
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height

    const canvas = previewCanvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    const pixelRatio = window.devicePixelRatio
    canvas.width = crop.width * pixelRatio
    canvas.height = crop.height * pixelRatio

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = 'high'

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

    const croppedUrl = canvas.toDataURL('image/jpeg', 0.9)
    setPreviewUrl(croppedUrl)

    const updatedImages = [...images]
    updatedImages[currentImageIndex] = {
      ...updatedImages[currentImageIndex],
      completedCrop: crop,
      url: croppedUrl,
    }
    setImages(updatedImages)
  }, [crop, currentImageIndex, images])

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
                        src={currentImage.url}
                        style={{
                          transform: `scale(${zoomLevel})`,
                          transformOrigin: 'center center',
                          maxWidth: '100%',
                          maxHeight: '100%',
                        }}
                        onLoad={onImageLoad}
                      />
                    </ReactCrop>
                  )}

                  <Dropdown
                    align="start"
                    className={s.dropdownCrops}
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
                      <Typography text="Original" variant="h3" />
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
                    <DropdownItem className={s.dropdownItem} onClick={() => setShowCrop(true)}>
                      <Typography text="Обрезать" variant="regular_16" />
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
                      <Button className={s.btn} variant="languageButton">
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
                          className={s.addButton}
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
                <canvas ref={previewCanvasRef} style={{ display: 'none' }} />
              </div>
            )}

            {step === 'filter' && (
              <div className={classNames.imagePreview}>
                <div className={s.containerFilter}>
                  <div className={s.mainFilterImage}>
                    <SafeImageFilter filter={currentImage.filter} image={currentImage.url} />
                  </div>
                  <div className={s.gridFilter}>
                    <ImageFilter filter={filters} image={currentImage} />
                  </div>
                </div>
              </div>
            )}

            {step === 'publish' && (
              <div className={s.containerPublish}>
                <div className={s.imageColumn}>
                  <img className={s.publishImage} src={currentImage.url} />
                </div>

                <div className={s.infoColumn}>
                  <div className={s.userInfo}>
                    <img alt="User avatar" className={s.avatar} src="" />
                    <Typography variant="small_link">Your profile</Typography>
                  </div>

                  <Textarea
                    className={s.description}
                    title="Add publication descriptions"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />

                  <hr className={s.divider} />

                  <Input
                    className={s.locationInput}
                    placeholder="Your location"
                    title="Add location"
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                  />
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

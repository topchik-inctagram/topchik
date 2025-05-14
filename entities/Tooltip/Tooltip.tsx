import { clsx } from 'clsx'
import s from './Tooltip.module.scss'
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
  Square,
  Rectangle,
  HorizontalRectangle,
  LeftArrow,
  RightArrow,
} from '@/public/icons'
import { Toast } from '@/shared/components/Toast'
import { type ChangeEvent, useState, useRef, useCallback, useEffect } from 'react'
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { TooltipModals } from './TooltipModals/TooltipModals'
import { useMeQuery } from '@/features/auth/api'
import {
  useCreatePostMutation,
  useGetPostsQuery,
  useUpdatePostMutation,
} from '@/features/posts/api'

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
  originalUrl: string
  file: File
  filter?: string
  crop?: Crop
  completedCrop?: Crop
  zoom?: number
}

type Props = {
  className?: string
  open: boolean
  onClose: () => void
  isAuth?: boolean
  placeholder?: string
  onImageSelect?: (file: File) => void
}

type DraftData = {
  description: string
  location: string
  step: string
  images: { url: string; filter?: string }[]
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

export const Tooltip = ({ className, placeholder, open, onClose, onImageSelect }: Props) => {
  const [images, setImages] = useState<UploadedImage[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [aspectRatio, setAspectRatio] = useState<string>('Original')
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [crop, setCrop] = useState<Crop | undefined>({
    unit: '%',
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  })
  const imgRef = useRef<HTMLImageElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const [shouldApplyCrop, setShouldApplyCrop] = useState(false)
  const [showCrop, setShowCrop] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [step, setStep] = useState<'add' | 'crop' | 'filter' | 'publish'>('add')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVariant, setToastVariant] = useState<'error' | 'success'>('error')
  const [isPublishing, setIsPublishing] = useState(false)
  const { data: user, isLoading } = useMeQuery()
  const [createPost, { error: errorPost }] = useCreatePostMutation()
  const [updatePost] = useUpdatePostMutation()

  const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg'
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }

  const handleSubmit = async () => {
    setIsPublishing(true)
    try {
      const formData = new FormData()

      for (let i = 0; i < images.length; i++) {
        const img = images[i]
        const canvas = previewCanvasRef.current
        const ctx = canvas?.getContext('2d')
        if (!ctx || !canvas) {
          continue
        }

        const imageElement = new Image()
        imageElement.crossOrigin = 'anonymous'
        imageElement.src = img.url
        await new Promise(resolve => (imageElement.onload = resolve))

        canvas.width = imageElement.naturalWidth
        canvas.height = imageElement.naturalHeight
        ctx.filter = img.filter || 'none'
        ctx.drawImage(imageElement, 0, 0)

        const dataUrl = canvas.toDataURL('image/jpeg', 0.9)
        const file = dataURLtoFile(dataUrl, `filtered_${i}.jpg`)
        formData.append('files', file)
      }

      const response = await createPost(formData).unwrap()

      await updatePost({
        id: response.id,
        data: { description },
      })

      clearTooltipDraft()
      onClose()
      setToastVariant('success')
      setToastMessage('Post added')
      setShowToast(true)
      setIsPublishing(false)
    } catch (err) {
      console.error(errorPost)
      setToastVariant('error')
      setToastMessage('Could not add post')
      setShowToast(true)
    }
  }

  const handleSaveDraft = () => {
    saveTooltipDraft({
      description,
      location,
      step,
      images: images.map(({ url, filter }) => ({ url, filter })),
    })
    onClose()
  }

  const loadTooltipDraft = () => {
    const draftRaw = localStorage.getItem('tooltip_draft')
    if (!draftRaw) {
      setToastVariant('error')
      setToastMessage('No draft found.')
      setShowToast(true)
      return
    }
    try {
      const draft = JSON.parse(draftRaw)
      const loadedImages: UploadedImage[] = (draft.images || []).map((img: any, index: number) => ({
        id: `draft-${index}`,
        url: img.url,
        originalUrl: img.url,
        file: null,
        filter: img.filter,
        crop: undefined,
        completedCrop: undefined,
      }))

      setDescription(draft.description || '')
      setLocation(draft.location || '')
      setStep(draft.step || 'add')
      setImages(loadedImages)
      setCurrentImageIndex(draft.currentImageIndex || 0)
    } catch (e) {
      console.error('Failed to parse draft:', e)
      setToastVariant('error')
      setToastMessage('Draft corrupted.')
      setShowToast(true)
    }
  }

  const saveTooltipDraft = (data: DraftData) => {
    try {
      localStorage.setItem('tooltip_draft', JSON.stringify(data))
    } catch (e) {
      setToastVariant('error')
      setToastMessage('Failed to save draft')
      setShowToast(true)
      console.error('Failed to save draft', e)
    }
  }

  const clearTooltipDraft = () => {
    localStorage.removeItem('tooltip_draft')
  }

  const {
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: [],
    },
  })

  const filters = [
    { name: 'Normal', value: 'none' },
    { name: 'Clarendon', value: 'contrast(1.2) brightness(1.1)' },
    { name: 'Lark', value: 'brightness(1.05) saturate(1.3)' },
    { name: 'Gingham', value: 'grayscale(0.3) contrast(1.05)' },
    { name: 'Moon', value: 'grayscale(1) contrast(0.9)' },
    { name: 'Juno', value: 'saturate(1.5) contrast(0.8)' },
    { name: 'Slumber', value: 'brightness(1.1) sepia(0.2)' },
    { name: 'Crema', value: 'brightness(1.05) sepia(0.1)' },
    { name: 'Ludwig', value: 'saturate(1.2) brightness(0.9)' },
  ]

  useEffect(() => {
    if (open) {
      const draftRaw = localStorage.getItem('tooltipDraft')
      if (draftRaw) {
        const draft = JSON.parse(draftRaw)
        setDescription(draft.description || '')
        setLocation(draft.location || '')
        setStep(draft.step || 'add')
        setImages(draft.images || [])
        setCurrentImageIndex(draft.currentImageIndex || 0)
      } else {
        setStep('add')
        setImages([])
        setCurrentImageIndex(0)
        setDescription('')
        setLocation('')
      }
    }
  }, [open])

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) {
      return
    }

    setImages(prev => (prev.length > 0 ? prev : []))

    const availableSlots = 10 - images.length
    if (availableSlots <= 0) {
      setToastVariant('error')
      setToastMessage('Maximum 10 images')
      setShowToast(true)
      return
    }

    const filesToUpload = Array.from(files).slice(0, 1)
    const newImages: UploadedImage[] = []

    for (const file of filesToUpload) {
      try {
        const validationResult = imageSchema.safeParse(file)
        if (!validationResult.success) {
          setToastVariant('error')
          setToastMessage(validationResult.error.errors[0].message)
          setShowToast(true)
          continue
        }

        const reader = new FileReader()
        reader.onload = event => {
          const newImage = {
            id: Date.now() + Math.random().toString(),
            url: event.target?.result as string,
            originalUrl: event.target?.result as string,
            file: file,
          }
          newImages.push(newImage)

          if (newImages.length === filesToUpload.length) {
            if (step === 'add') {
              setImages(newImages)
              setCurrentImageIndex(0)
              setStep('crop')
              setCrop(undefined)
              setAspectRatio('Original')
              setShowCrop(false)
              setZoomLevel(1)
            } else {
              setImages(prev => [...prev, ...newImages])
              setCurrentImageIndex(images.length)
            }

            onImageSelect?.(file)
          }
        }
        reader.readAsDataURL(file)
      } catch (error) {
        console.error('Upload error:', error)
        setToastVariant('error')
        setToastMessage('Upload error')
        setShowToast(true)
      }
    }
    e.target.value = ''
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
      setShowCrop(false)
      setCrop(undefined)
      setAspectRatio('Original')
      setZoomLevel(1)
      setImages(prev =>
        prev.map((img, index) =>
          index === currentImageIndex ? { ...img, url: img.originalUrl } : img
        )
      )
    }
  }

  const handleZoomChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newZoom = parseFloat(e.target.value)
    setZoomLevel(newZoom)

    setImages(prev =>
      prev.map((img, index) => (index === currentImageIndex ? { ...img, zoom: newZoom } : img))
    )
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
      console.warn('No data for crop')
      return
    }

    const image = imgRef.current
    const canvas = previewCanvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx || !image.complete || image.naturalWidth === 0) {
      console.warn('Canvas or image is not ready')
      return
    }

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const zoom = images[currentImageIndex]?.zoom || 1

    const cropWidth = ((crop.width || 1) * scaleX) / zoom
    const cropHeight = ((crop.height || 1) * scaleY) / zoom

    canvas.width = cropWidth
    canvas.height = cropHeight

    ctx.drawImage(
      image,
      crop.x * scaleX + (crop.width * scaleX - cropWidth) / 2,
      crop.y * scaleY + (crop.height * scaleY - cropHeight) / 2,
      cropWidth,
      cropHeight,
      0,
      0,
      canvas.width,
      canvas.height
    )

    const croppedUrl = canvas.toDataURL('image/jpeg', 0.9)

    setImages(prev =>
      prev.map((img, index) =>
        index === currentImageIndex ? { ...img, url: croppedUrl, completedCrop: crop } : img
      )
    )
  }, [crop, currentImageIndex, images])

  const renderHeader = () => {
    switch (step) {
      case 'add':
        return (
          <div className={s.stepHeader}>
            <Typography variant="h1">Add Photo</Typography>
            <button className={s.closeButton} onClick={onClose}>
              <CloseOutline />
            </button>
          </div>
        )
      case 'crop':
        return (
          <div className={s.stepHeader}>
            <button
              className={s.backButton}
              onClick={() => {
                setImages(prev =>
                  prev.map((img, index) =>
                    index === currentImageIndex ? { ...img, url: img.originalUrl } : img
                  )
                )
                setShowCrop(false)
                setStep('add')
              }}
            >
              <ArrowIosBack />
            </button>
            <Typography className={s.stepTitle} variant="h1">
              Cropping
            </Typography>
            <button
              className={s.nextButton}
              onClick={() => {
                handleApplyCrop()
                setShowCrop(false)
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
            <button
              className={s.backButton}
              onClick={() => {
                setImages(prev =>
                  prev.map((img, index) =>
                    index === currentImageIndex
                      ? {
                          ...img,
                          url: img.originalUrl,
                          completedCrop: undefined,
                          crop: undefined,
                          filter: undefined,
                        }
                      : img
                  )
                )
                setShowCrop(false)
                setAspectRatio('Original')
                handleAspectRatioChange('Original')
                setStep('crop')
              }}
            >
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
              Publication
            </Typography>
            <button className={s.nextButton} disabled={isPublishing} onClick={handleSubmit}>
              {isPublishing ? 'Publishing…' : 'Publish'}
            </button>
          </div>
        )
      default:
        return 'add'
    }
  }

  const currentImage = images[currentImageIndex]

  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
      setShowCrop(false)
    }
  }

  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
      setShowCrop(false)
    }
  }

  const classNames = {
    container: clsx(s.container, className, {
      [s.hasImage]: images.length > 0,
    }),
    addPhotoBtn: clsx(s.btn, s.addPhotoBtn, className),
  }

  return (
    <div>
      {showToast && (
        <Toast
          description={toastMessage}
          open={showToast}
          variant={toastVariant as 'error' | 'success'}
          onOpenChange={setShowToast}
        />
      )}
      <TooltipModals
        open={open}
        title={renderHeader()}
        onClose={onClose}
        onSaveDraft={handleSaveDraft}
      >
        <div className={classNames.container}>
          {step === 'add' ? (
            <>
              {placeholder && (
                <div className={s.placeholder}>
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
                  onClick={() => {
                    document.getElementById('file-upload')?.click()
                    setShowImageModal(false)
                  }}
                >
                  Select from Computer
                </Button>
                <Button variant="outlined" onClick={loadTooltipDraft}>
                  Open Draft
                </Button>

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
                <div className={s.aspectWrapper}>
                  {!showCrop ? (
                    <div>
                      <img
                        ref={imgRef}
                        alt="Preview"
                        className={s.fullSizeImage}
                        crossOrigin="anonymous"
                        src={currentImage.originalUrl}
                        style={{
                          transform: `scale(${zoomLevel})`,
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
                      onChange={c => setCrop(c)}
                    >
                      <img
                        ref={imgRef}
                        alt="Preview"
                        crossOrigin="anonymous"
                        src={currentImage.originalUrl}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                          transform: `scale(${zoomLevel})`,
                          transformOrigin: 'center center',
                        }}
                        onLoad={onImageLoad}
                      />
                    </ReactCrop>
                  )}
                  {/* Navigation arrows */}
                  <div className={s.imageNavigation}>
                    {currentImageIndex > 0 && (
                      <button className={s.leftArrowCrop} onClick={handlePreviousImage}>
                        <LeftArrow />
                      </button>
                    )}
                    {currentImageIndex < images.length - 1 && (
                      <button className={s.rightArrowCrop} onClick={handleNextImage}>
                        <RightArrow />
                      </button>
                    )}
                    {/* Dots */}
                    {images.length > 1 && (
                      <div className={s.imageDotsCrop}>
                        {images.map((_, index) => (
                          <div
                            key={index}
                            className={clsx(s.dotCrop, {
                              [s.activeDotCrop]: index === currentImageIndex,
                            })}
                            onClick={() => {
                              setCurrentImageIndex(index)
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
                          value={zoomLevel}
                          onChange={handleZoomChange}
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
                            onChange={handleImageUpload}
                          />
                          <div className={s.thumbnailGrid}>
                            {images.map((img, index) => (
                              <div key={img.id} className={s.thumbnailItem}>
                                <img
                                  className={clsx(s.thumbnailImage, {
                                    [s.selected]: index === currentImageIndex,
                                  })}
                                  src={img.url}
                                  onClick={() => {
                                    setCurrentImageIndex(index)
                                  }}
                                />
                                <span
                                  className={s.removeButton}
                                  onClick={e => {
                                    e.stopPropagation()
                                    handleRemoveImage(img.id)
                                  }}
                                >
                                  <CloseOutline></CloseOutline>
                                </span>
                              </div>
                            ))}
                            <button
                              className={s.addButtonPhoto}
                              type="button"
                              onClick={() => document.getElementById('file-upload')?.click()}
                            >
                              <PlusCircleOutline />
                            </button>
                          </div>
                        </div>
                      )}
                      <span
                        className={classNames.addPhotoBtn}
                        onClick={() => setShowImageModal(prev => !prev)}
                      >
                        <ImageOutline className={s.icons} />
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {step === 'filter' && (
                <div className={s.filterContainer}>
                  <div className={s.imagePreviewContainer}>
                    {currentImageIndex > 0 && (
                      <button className={s.leftArrowFilter} onClick={handlePreviousImage}>
                        <LeftArrow />
                      </button>
                    )}
                    <img
                      alt="Filtered preview"
                      className={s.mainPreviewImage}
                      src={currentImage.url}
                      style={{ filter: currentImage.filter || 'none' }}
                    />
                    {currentImageIndex < images.length - 1 && (
                      <button className={s.rightArrowFilter} onClick={handleNextImage}>
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
                            onClick={() => setCurrentImageIndex(index)}
                          />
                        ))}
                      </div>
                    )}
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
                        <img
                          alt={`Thumbnail for ${filter.name}`}
                          className={s.filterThumbnail}
                          src={currentImage.url}
                          style={{ filter: filter.value }}
                        />
                        <Typography className={s.filterName}>{filter.name}</Typography>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 'publish' && currentImage && (
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
                          <button className={s.leftArrowFilter} onClick={handlePreviousImage}>
                            <LeftArrow />
                          </button>
                        )}
                        {currentImageIndex < images.length - 1 && (
                          <button className={s.rightArrowFilter} onClick={handleNextImage}>
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
                              onClick={() => setCurrentImageIndex(index)}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <div className={s.infoColumn}>
                    <div className={s.userInfo}>
                      <img
                        alt="Avatar"
                        className={s.avatar}
                        src={user?.profile?.avatarInfo?.url || '/default-avatar.jpg'}
                      />
                      <Typography variant="small">
                        {isLoading ? 'Se încarcă...' : user?.username || 'Anonim'}
                      </Typography>
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
                      onChange={e => setDescription(e.target.value)}
                    />

                    <hr className={s.divider} />

                    <div className={s.locationSection}>
                      <Input className={s.inputWithLeftMargin} label="Add location" />
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            'add'
          )}
        </div>

        <div style={{ display: 'none' }}>
          <canvas ref={previewCanvasRef} />
        </div>
      </TooltipModals>
    </div>
  )
}

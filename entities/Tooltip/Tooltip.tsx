import { clsx } from 'clsx'
import s from './Tooltip.module.scss'
import { Typography } from '@/shared/components'
import { ArrowIosBack, CloseOutline } from '@/public/icons'
import { Toast } from '@/shared/components/Toast'
import { type ChangeEvent, useState, useRef, useCallback, useEffect } from 'react'
import { type Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { TooltipModals } from './TooltipModals/TooltipModals'
import { useMeQuery } from '@/features/auth/api'
import { useCreatePostMutation, useUpdatePostMutation } from '@/features/posts/api'
import type { TooltipProps, UploadedImageProps, FormValuesProps } from './types'
import { centerAspectCrop, dataURLtoFile } from './utils/imageUtils'
import { saveTooltipDraft, loadFullTooltipDraft, parseDraftImages } from './utils/draftService'
import { ImageUpload } from './steps/ImageUpload'
import { CropStep } from './steps/CropStep'
import { FilterStep } from './steps/FilterStep'
import { PublishStep } from './steps/PublishStep'
import { filters } from './utils/filters'
import { handleTooltipSubmit } from './handlers/submitTooltip'

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

export const Tooltip = ({ className, placeholder, open, onClose, onImageSelect }: TooltipProps) => {
  const [images, setImages] = useState<UploadedImageProps[]>([])
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
  const [createPost] = useCreatePostMutation()
  const [updatePost] = useUpdatePostMutation()

  const handleSubmit = async () => {
    setIsPublishing(true)

    await handleTooltipSubmit({
      images,
      description,
      createPost,
      updatePost,
      previewCanvasRef,
      onClose,
      onSuccess: () => {
        setToastVariant('success')
        setToastMessage('Post added')
        setShowToast(true)
        setIsPublishing(false)
      },
      onError: (msg: string) => {
        setToastVariant('error')
        setToastMessage(msg)
        setShowToast(true)
        setIsPublishing(false)
      },
    })
  }

  const handleSaveDraft = () => {
    saveTooltipDraft(
      {
        description,
        location,
        step,
        images: images.map(({ url, filter }) => ({ url, filter })),
      },
      msg => {
        setToastVariant('error')
        setToastMessage(msg)
        setShowToast(true)
      }
    )
    onClose()
  }

  const loadTooltipDraft = () => {
    const { draft, error } = loadFullTooltipDraft()

    if (error || !draft) {
      setToastVariant('error')
      setToastMessage(error || 'Draft missing.')
      setShowToast(true)
      return
    }

    const loadedImages = parseDraftImages(draft.images)

    const validSteps = ['add', 'crop', 'filter', 'publish'] as const
    const isValidStep = (step: any): step is (typeof validSteps)[number] =>
      validSteps.includes(step)

    setStep(isValidStep(draft.step) ? draft.step : 'add')
    setDescription(draft.description || '')
    setLocation(draft.location || '')
    setImages(loadedImages)
    setCurrentImageIndex(typeof draft.currentImageIndex === 'number' ? draft.currentImageIndex : 0)
  }

  const {
    formState: { errors },
  } = useForm<FormValuesProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: [],
    },
  })

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
    const newImages: UploadedImageProps[] = []

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
            <ImageUpload
              error={errors.images?.message}
              placeholder={placeholder}
              onFileChange={handleImageUpload}
              onLoadDraft={loadTooltipDraft}
              onUploadClick={() => {
                document.getElementById('file-upload')?.click()
                setShowImageModal(false)
              }}
            />
          ) : currentImage ? (
            <>
              {step === 'crop' && (
                <CropStep
                  aspectRatio={aspectRatio}
                  classNameBtnAddPhoto={classNames.addPhotoBtn}
                  crop={crop}
                  currentImageIndex={currentImageIndex}
                  image={currentImage}
                  images={images}
                  imgRef={imgRef}
                  setShowCrop={setShowCrop}
                  showCrop={showCrop}
                  showImageModal={showImageModal}
                  toggleImageModal={() => setShowImageModal(prev => !prev)}
                  zoom={zoomLevel}
                  onAspectRatioChange={handleAspectRatioChange}
                  onCropChange={setCrop}
                  onFileChange={handleImageUpload}
                  onFileUploadClick={() => document.getElementById('file-upload')?.click()}
                  onImageLoad={onImageLoad}
                  onNextImage={handleNextImage}
                  onPrevImage={handlePreviousImage}
                  onRemoveImage={handleRemoveImage}
                  onSelectImage={setCurrentImageIndex}
                  onZoomChange={val => setZoomLevel(val)}
                />
              )}

              {step === 'filter' && (
                <FilterStep
                  currentImage={currentImage}
                  currentImageIndex={currentImageIndex}
                  filters={filters}
                  images={images}
                  onFilterChange={value => {
                    setImages(prev =>
                      prev.map((img, idx) =>
                        idx === currentImageIndex ? { ...img, filter: value } : img
                      )
                    )
                  }}
                  onNextImage={handleNextImage}
                  onPrevImage={handlePreviousImage}
                  onSelectImage={setCurrentImageIndex}
                />
              )}

              {step === 'publish' && currentImage && (
                <PublishStep
                  avatarUrl={user?.profile?.avatarInfo?.url}
                  currentImage={currentImage}
                  currentImageIndex={currentImageIndex}
                  description={description}
                  images={images}
                  isLoading={isLoading}
                  location={location}
                  username={user?.username}
                  onDescriptionChange={setDescription}
                  onLocationChange={setLocation}
                  onNextImage={handleNextImage}
                  onPrevImage={handlePreviousImage}
                  onSelectImage={setCurrentImageIndex}
                />
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

import { type Crop } from 'react-image-crop'

export type FormValuesProps = {
  images: File[]
}

export type UploadedImageProps = {
  id: string
  url: string
  originalUrl: string
  file: File | null
  filter?: string
  crop?: Crop
  completedCrop?: Crop
  zoom?: number
}

export type TooltipProps = {
  className?: string
  open: boolean
  onClose: () => void
  isAuth?: boolean
  placeholder?: string
  onImageSelect?: (file: File) => void
}

export type DraftDataProps = {
  description: string
  location: string
  step: string
  images: { url: string; filter?: string }[]
  currentImageIndex?: number
}

export type CropStepProps = {
  image: UploadedImageProps
  images: UploadedImageProps[]
  crop?: Crop
  zoom: number
  aspectRatio: string
  showCrop: boolean
  currentImageIndex: number
  onCropChange: (crop: Crop) => void
  onImageLoad: (e: React.SyntheticEvent<HTMLImageElement>) => void
  onZoomChange: (value: number) => void
  onAspectRatioChange: (ratio: string) => void
  onNextImage: () => void
  onPrevImage: () => void
  onSelectImage: (index: number) => void
  onRemoveImage: (id: string) => void
  showImageModal: boolean
  toggleImageModal: () => void
  setShowCrop: (val: boolean) => void
  classNameBtnAddPhoto?: string
  onFileUploadClick: () => void
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  imgRef: React.RefObject<HTMLImageElement | null>
}

type Filter = { name: string; value: string }

export type FilterProps = {
  currentImage: UploadedImageProps
  currentImageIndex: number
  images: UploadedImageProps[]
  filters: Filter[]
  onSelectImage: (index: number) => void
  onNextImage: () => void
  onPrevImage: () => void
  onFilterChange: (value: string) => void
}

export type PublishProps = {
  currentImage: UploadedImageProps
  currentImageIndex: number
  images: UploadedImageProps[]
  description: string
  location: string
  username?: string
  avatarUrl?: string
  isLoading: boolean
  onSelectImage: (index: number) => void
  onNextImage: () => void
  onPrevImage: () => void
  onDescriptionChange: (val: string) => void
  onLocationChange: (val: string) => void
}

// submitTooltip.ts
import { dataURLtoFile } from '../utils/imageUtils'
import { clearTooltipDraft } from '../utils/draftService'
import type { UploadedImageProps } from '../types'
import type React from 'react'

export const handleTooltipSubmit = async ({
  images,
  description,
  createPost,
  updatePost,
  previewCanvasRef,
  onClose,
  onSuccess,
  onError,
}: {
  images: UploadedImageProps[]
  description: string
  createPost: any
  updatePost: any
  previewCanvasRef: React.RefObject<HTMLCanvasElement | null>
  onClose: () => void
  onSuccess: () => void
  onError: (message: string) => void
}) => {
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
    await updatePost({ id: response.id, data: { description } })

    clearTooltipDraft()
    onClose()
    onSuccess()
  } catch (error) {
    console.error(error)
    onError('Could not add post')
  }
}

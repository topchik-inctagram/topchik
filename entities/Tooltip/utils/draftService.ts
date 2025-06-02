import type { DraftDataProps, UploadedImageProps } from '../types'

export const saveTooltipDraft = (data: DraftDataProps, onError?: (message: string) => void) => {
  try {
    localStorage.setItem('tooltip_draft', JSON.stringify(data))
  } catch (e) {
    if (onError) {
      onError('Failed to save draft')
    }
    console.error('Failed to save draft', e)
  }
}

export const loadFullTooltipDraft = (): {
  draft: DraftDataProps | null
  error: string | null
} => {
  try {
    const draftRaw = localStorage.getItem('tooltip_draft')
    if (!draftRaw) {
      return { draft: null, error: 'No draft found.' }
    }

    const draft = JSON.parse(draftRaw) as DraftDataProps
    return { draft, error: null }
  } catch (e) {
    return { draft: null, error: 'Draft corrupted.' }
  }
}

export const clearTooltipDraft = () => {
  localStorage.removeItem('tooltip_draft')
}

export const parseDraftImages = (draftImages: any[]): UploadedImageProps[] =>
  draftImages.map((img, index) => ({
    id: `draft-${index}`,
    url: img.url,
    originalUrl: img.url,
    file: null,
    filter: img.filter,
    crop: undefined,
    completedCrop: undefined,
  }))

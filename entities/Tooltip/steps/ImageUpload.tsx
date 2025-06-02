import { type ChangeEvent } from 'react'
import { Button, Input, Typography } from '@/shared/components'
import { ImageOutline } from '@/public/icons'
import s from '../Tooltip.module.scss'

type Props = {
  onUploadClick: () => void
  onLoadDraft: () => void
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
  placeholder?: string
}

export const ImageUpload = ({
  onUploadClick,
  onLoadDraft,
  onFileChange,
  error,
  placeholder,
}: Props) => (
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
        onChange={onFileChange}
      />
      <Button variant="primary" onClick={onUploadClick}>
        Select from Computer
      </Button>
      <Button variant="outlined" onClick={onLoadDraft}>
        Open Draft
      </Button>
      {error && (
        <Typography color="error" variant="medium_14">
          {error}
        </Typography>
      )}
    </div>
  </>
)

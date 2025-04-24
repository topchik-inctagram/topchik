import { Modal, Button, Typography } from '@/shared/components'
import s from './ConfirmModal.module.scss'

type Props = {
  open: boolean
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
  cancelText?: string
}

export const ConfirmModal = ({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = 'Yes',
  cancelText = 'No',
}: Props) => {
  return (
    <Modal open={open} title={title} onOpenChange={onCancel}>
      <div className={s.container}>
        <Typography variant="regular_16">{description}</Typography>
        <div className={s.buttonContainer}>
          <Button className={s.button} variant="outlined" onClick={onConfirm}>
            {confirmText}
          </Button>
          <Button className={s.button} onClick={onCancel}>
            {cancelText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

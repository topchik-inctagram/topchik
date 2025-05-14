// components/TooltipModals/CloseToolTipModal.tsx
import { Modal } from '@/shared/components/Modal'
import { Button, Typography } from '@/shared/components'
import s from './CloseToolTipModal.module.scss'

type Props = {
  open: boolean
  onDiscard: () => void
  onSaveDraft: () => void
  onCancel: () => void
}

export const CloseToolTipModal = ({ open, onDiscard, onSaveDraft, onCancel }: Props) => {
  return (
    <Modal open={open} size="sm" title="Close" onOpenChange={onCancel}>
      <div className={s.modal}>
        <Typography className={s.text} variant="regular_16">
          Do you really want to close the creation of a publication?
        </Typography>
        <Typography className={s.text} variant="regular_16">
          If you close everything will be deleted
        </Typography>
        <div className={s.actions}>
          <Button className={s.discardBtn} variant="outlined" onClick={onDiscard}>
            Discard
          </Button>
          <Button className={s.saveBtn} onClick={onSaveDraft}>
            Save draft
          </Button>
        </div>
      </div>
    </Modal>
  )
}

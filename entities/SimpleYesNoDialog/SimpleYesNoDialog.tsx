import { Modal, Button, Typography } from '@/shared/components'
import s from './SimpleYesNoDialog.module.scss'

type Props = {
  open: boolean
  title: string
  description: string
  boldText?: string
  onConfirm: () => void
  onCancel: () => void
}

export const SimpleYesNoDialog = ({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  boldText,
}: Props) => {
  const [start, end] = description.split('_boldText_')
  return (
    <Modal open={open} title={title} onOpenChange={onCancel}>
      <div className={s.container}>
        <Typography variant="regular_16">
          {start}
          {boldText && <span className={s.email}>{boldText}</span>}
          {end}
        </Typography>

        <div className={s.buttonContainer}>
          <Button className={s.button} variant="outlined" onClick={onConfirm}>
            Yes
          </Button>
          <Button className={s.button} onClick={onCancel}>
            No
          </Button>
        </div>
      </div>
    </Modal>
  )
}

import { Button, Checkbox, Modal, Typography } from '@/shared/components'
import s from './createPaymentModal.module.scss'
import { useState } from 'react'

type Props = {
  onClose: () => void
}

export const CreatePaymentModal = ({ onClose }: Props) => {
  const [openModal, setOpenModal] = useState(true)

  const modalCloseHandler = () => {
    setOpenModal(false)
    onClose()
  }

  return (
    <Modal
      className={s.modal}
      open={openModal}
      title="Create payment"
      onOpenChange={modalCloseHandler}
    >
      <div className={s.container}>
        <Typography>
          Auto-renewal will be enabled with this payment. You can disable it anytime in your profile
          settings
        </Typography>
        <div className={s.buttonCheckboxBlock}>
          <Checkbox className={s.checkbox} label="I agree" rootClassName={s.rootClassName} />
          <Button className={s.button} onClick={modalCloseHandler}>
            OK
          </Button>
        </div>
      </div>
    </Modal>
  )
}

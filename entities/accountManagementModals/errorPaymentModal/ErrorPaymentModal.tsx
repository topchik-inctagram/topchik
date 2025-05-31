import { useState } from 'react'
import { Button, Modal, Typography } from '@/shared/components'
import s from './ErrorPaymentModal.module.scss'

type Props = {
  onClose: () => void
}

export const ErrorPaymentModal = ({ onClose }: Props) => {
  const [openModal, setOpenModal] = useState(true)

  const modalCloseHandler = () => {
    setOpenModal(false)
    onClose()
  }

  return (
    <Modal className={s.modal} open={openModal} title="Error" onOpenChange={modalCloseHandler}>
      <div className={s.container}>
        <Typography>Transaction failed. Please, write to support</Typography>
        <Button fullWidth className={s.button} onClick={modalCloseHandler}>
          Back to payment
        </Button>
      </div>
    </Modal>
  )
}

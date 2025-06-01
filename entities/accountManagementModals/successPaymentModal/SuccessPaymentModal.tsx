import { useState } from 'react'
import { Button, Checkbox, Modal, Typography } from '@/shared/components'
import s from './SuccessPaymentModal.module.scss'

type Props = {
  onClose: () => void
}

export const SuccessPaymentModal = ({ onClose }: Props) => {
  const [openModal, setOpenModal] = useState(true)

  const modalCloseHandler = () => {
    setOpenModal(false)
    onClose()
  }

  return (
    <Modal className={s.modal} open={openModal} title="Success" onOpenChange={modalCloseHandler}>
      <div className={s.container}>
        <Typography>Payment was successful!</Typography>
        <Button className={s.button} onClick={modalCloseHandler}>
          OK
        </Button>
      </div>
    </Modal>
  )
}

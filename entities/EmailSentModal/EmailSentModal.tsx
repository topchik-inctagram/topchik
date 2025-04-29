import { Button, Modal, Typography } from '@/shared/components'
import s from './EmailSentModal.module.scss'
import { useState } from 'react'

type Props = {
  email: string
  onClose: () => void
}

export const EmailSentModal = ({ email, onClose }: Props) => {
  const [openModal, setOpenModal] = useState(true)

  const modalOpenHandler = () => {
    setOpenModal(false)
    onClose()
  }

  return (
    <Modal
      className="modal-header-override"
      open={openModal}
      title="Email sent"
      onOpenChange={modalOpenHandler}
    >
      <div className={s.container}>
        <Typography variant="regular_16">We have sent a link to confirm your {email}</Typography>
        <Button className={s.button} onClick={modalOpenHandler}>
          OK
        </Button>
      </div>
    </Modal>
  )
}

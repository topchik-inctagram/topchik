import { Button, Modal, Typography } from '@/shared/components'
import s from './EmailSentModal.module.scss'

type Props = {
  email: string
}

export const EmailSentModal = ({ email }: Props) => {
  return (
    <Modal open className="modal-header-override" title="Email sent">
      <div className={s.container}>
        <Typography variant="regular_16">We have sent a link to confirm your {email}</Typography>
        <Button className={s.button}>OK</Button>
      </div>
    </Modal>
  )
}

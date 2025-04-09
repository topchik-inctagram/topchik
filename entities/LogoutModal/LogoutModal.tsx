import { Button, Modal, Typography } from '@/shared/components'
import s from '@/entities/EmailSentModal/EmailSentModal.module.scss'
import { useLogoutMutation, useMeQuery } from '@/features/auth/api'
import { TOKEN } from '@/shared/constants'
import { baseApi } from '@/shared/stores'
import { useRouter } from 'next/navigation'
import { PublicPages } from '@/shared/enums'

type Props = {
  open: boolean
  onClose?: () => void
}

export function LogoutModal({ open, onClose }: Props) {
  const router = useRouter()
  const { data: meData, isLoading } = useMeQuery()
  const [logout] = useLogoutMutation()

  const logOutHandler = async () => {
    try {
      await logout()
      localStorage.removeItem(TOKEN)
      baseApi.util?.resetApiState()
      router.push(PublicPages.signIn)
      onClose?.()
    } catch (e: any) {
      console.log(e)
    }
  }

  if (isLoading) {
    return <div>wait please</div>
  }

  return (
    <Modal className="modal-header-override" open={open} title="Log Out" onOpenChange={onClose}>
      <div className={s.container}>
        <Typography variant="regular_16">
          Are you really want to log out of your account {meData.email ?? ''}?
        </Typography>
        <Button className={s.button} onClick={logOutHandler}>
          Yes
        </Button>
        <Button className={s.button} onClick={onClose}>
          No
        </Button>
      </div>
    </Modal>
  )
}

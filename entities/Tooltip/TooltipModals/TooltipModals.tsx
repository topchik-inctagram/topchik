import * as Dialog from '@radix-ui/react-dialog'
import s from './TooltipModals.module.scss'
import { type ComponentPropsWithRef, type ReactNode, useState } from 'react'
import clsx from 'clsx'
import { CloseToolTipModal } from '@/entities/CloseToolTipModal/CloseToolTipModal'

type Props = {
  open: boolean
  onClose: () => void
  title: ReactNode
  children?: ReactNode
  onSaveDraft?: () => void
} & ComponentPropsWithRef<'div'>

export const TooltipModals = ({
  title,
  children,
  open,
  onClose,
  className,
  onSaveDraft,
  ...rest
}: Props) => {
  const classNames = {
    overlay: s.Overlay,
    content: clsx(s.Content, className),
    header: s.ModalHeader,
    title: s.Title,
    closeButton: s.IconButton,
    body: s.ModalBody,
    titleContainer: s.titleContainer,
  }

  const [showConfirmModal, setShowConfirmModal] = useState(false)

  return (
    <Dialog.Root
      open={open}
      onOpenChange={isOpen => {
        if (!isOpen) {
          setShowConfirmModal(true)
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className={classNames.overlay} />
        <Dialog.Content
          className={classNames.content}
          onEscapeKeyDown={e => {
            e.preventDefault()
            setShowConfirmModal(true)
          }}
          onPointerDownOutside={e => {
            e.preventDefault()
            setShowConfirmModal(true)
          }}
          {...rest}
        >
          <div className={classNames.header}>
            <Dialog.Title className={classNames.title}>{title}</Dialog.Title>
          </div>
          <hr />
          <div className={classNames.body}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>

      <CloseToolTipModal
        open={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        onDiscard={() => {
          setShowConfirmModal(false)
        }}
        onSaveDraft={() => {
          onSaveDraft?.()
          setShowConfirmModal(false)
        }}
      />
    </Dialog.Root>
  )
}

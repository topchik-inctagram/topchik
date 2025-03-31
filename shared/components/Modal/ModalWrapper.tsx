import * as Dialog from '@radix-ui/react-dialog'
import s from './ModalWrapper.module.scss'
import { ComponentPropsWithRef } from 'react'
import clsx from 'clsx'
import { CloseOutline } from '@/public'

type ModalSize = 'lg' | 'md' | 'sm'

type Props = {
  open: boolean
  onClose: () => void
  title: string
  size?: ModalSize
  children?: React.ReactNode
} & ComponentPropsWithRef<'div'>

export const ModalWrapper = ({
  title,
  onClose,
  children,
  open,
  size = 'sm',
  className,
  ...rest
}: Props) => {
  const classNames = {
    overlay: s.Overlay,
    content: clsx(s.Content, s[size], className),
    header: s.ModalHeader,
    title: s.Title,
    closeButton: s.IconButton,
    body: s.ModalBody,
  }

  return (
    <Dialog.Root open={open} onOpenChange={onClose} {...rest}>
      <Dialog.Portal>
        <Dialog.Overlay className={classNames.overlay} />
        <Dialog.Content className={classNames.content}>
          <div className={classNames.header}>
            <Dialog.Title className={classNames.title}>{title}</Dialog.Title>
            <Dialog.Close asChild>
              <CloseOutline className={classNames.closeButton} aria-label="Close" />
            </Dialog.Close>
          </div>
          <hr />
          <div className={classNames.body}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

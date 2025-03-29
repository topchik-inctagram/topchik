import * as Dialog from '@radix-ui/react-dialog'
import s from './ModalRadix.module.scss'
import { ComponentPropsWithRef } from 'react'
import clsx from 'clsx'
import { CloseOutline } from '@/public'

type ModalSize = 'lg' | 'md' | 'sm'

type Props = {
  open: boolean
  onClose: () => void
  title: string
  size?: ModalSize
} & ComponentPropsWithRef<'div'>

export const ModalRadix = ({
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
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

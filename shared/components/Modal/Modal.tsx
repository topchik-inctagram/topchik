import * as Dialog from '@radix-ui/react-dialog'
import s from './Modal.module.scss'
import { type ComponentPropsWithRef } from 'react'
import clsx from 'clsx'
import { CloseOutline } from '@/public/icons'
import { Typography } from '@/shared/components'

type ModalSize = 'lg' | 'md' | 'sm'

type Props = {
  title: string
  size?: ModalSize
  className?: string
} & ComponentPropsWithRef<typeof Dialog.Root>

export const Modal = ({
  title,
  onOpenChange,
  children,
  open,
  size = 'sm',
  className,
  ...rest
}: Props) => {
  const classNames = {
    overlay: s.overlay,
    content: clsx(s.content, s[size], className),
    header: s.modalHeader,
    title: s.title,
    closeButton: s.iconButton,
    body: s.modalBody,
  }
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} {...rest}>
      <Dialog.Portal>
        <Dialog.Overlay className={classNames.overlay} />
        <Dialog.Content className={classNames.content}>
          <div className={classNames.header}>
            <Dialog.Title asChild className={classNames.title}>
              <Typography variant="h1">{title}</Typography>
            </Dialog.Title>
            <Dialog.Close asChild>
              <CloseOutline aria-label="Close" className={classNames.closeButton} />
            </Dialog.Close>
          </div>
          <hr />
          <div className={classNames.body}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

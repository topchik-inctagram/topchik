// components/TootlipModals/TootlipModals.tsx

import * as Dialog from '@radix-ui/react-dialog'
import s from './TootlipModals.module.scss'
import { type ComponentPropsWithRef, type ReactNode } from 'react'
import clsx from 'clsx'
import { CloseOutline } from '@/public/icons'

type ModalSize = 'lg' | 'md' | 'sm'

type Props = {
  open: boolean
  onClose: () => void
  title: ReactNode
  size?: ModalSize
  children?: ReactNode
} & ComponentPropsWithRef<'div'>

export const TootlipModals = ({
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
            <Dialog.Title className={classNames.title}>{title as ReactNode}</Dialog.Title>
          </div>
          <hr />
          <div className={classNames.body}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

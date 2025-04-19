import { clsx } from 'clsx'
import s from './Tootlip.module.scss'
import { Modal } from '@/shared/components'

type Props = {
  className: string
}

export const Tootlip = ({ className }: Props) => {
  const classNames = {
    container: clsx(s.container, className),
  }

  return (
    <div className={classNames.container}>
      <Modal title="Add Photo" />
    </div>
  )
}

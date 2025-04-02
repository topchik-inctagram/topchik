import clsx from 'clsx'
import s from './Recaptcha.module.scss'
import RecaptchIcon from '../../../public/icons/Recaptcha'
import { Сheckbox } from '../Сheckbox'
import * as Checkbox from '@radix-ui/react-checkbox'
import { ComponentPropsWithRef, useState } from 'react'

type RecaptchaProps = {
  className?: string
  id?: string
  label?: string
} & ComponentPropsWithRef<typeof Сheckbox>

export const Recaptcha = ({ className, id, label }: RecaptchaProps) => {
  const classNames = {
    container: clsx(s.container),
    checkbox: clsx(s.checkbox),
  }
  const [checked, setChecked] = useState('indeterminate')

  return (
    <div className={classNames.container}>
      <Сheckbox className={s.checkbox} />
      <RecaptchIcon className={s.icon} />
    </div>
  )
}

import clsx from 'clsx'
import s from './Recaptcha.module.scss'
import { CheckmarkRecaptcha, RecaptchaIcon } from '@/public'
import { Checkbox } from '@/shared/components'
import { CaptchaSpinner } from '../CaptchaSpinner/CaptchaSpinner'
import { Label } from '../Label/Label' 
import Link from 'next/link'

type RecaptchaStatus = 'idle' | 'pending' | 'verified' | 'error' | 'expired' | 'notVerified'

type RecaptchaProps = {
  className?: string
  id?: string
  label?: string
  isStatus?: RecaptchaStatus
  onVerify?: () => void
}

export const Recaptcha = ({ className, isStatus = 'idle', onVerify }: RecaptchaProps) => {
  const classNames = {
    wrapper: clsx(s.wrapper, {
      [s.wrapperError]: isStatus === 'expired' || isStatus === 'notVerified',
    }),
    container: clsx(s.container, className, {
      [s.verified]: isStatus === 'verified',
      [s.error]: isStatus === 'error',
      [s.expired]: isStatus === 'expired',
      [s.notVerified]: isStatus === 'notVerified',
      [s.pending]: isStatus === 'pending',
    }),
    checkbox: clsx(s.checkbox),
    label: clsx(s.label),
    errorContainer: clsx(s.errorContainer, {
      [s.errorInside]: isStatus === 'verified',
      [s.errorAbove]: isStatus === 'expired',
    }),
    errorMessage: clsx(s.errorMessage),
    cornerLabel: clsx(s.cornerLabel),
  }

  const handleClick = () => {
    if (
      (isStatus === 'idle' ||
        isStatus === 'error' ||
        isStatus === 'expired' ||
        isStatus === 'notVerified') &&
      onVerify
    ) {
      onVerify()
    }
  }

  const getErrorMessage = () => {
    switch (isStatus) {
      case 'expired':
        return 'Verification expired. Check the checkbox again.'
      case 'notVerified':
        return 'Please verify that you are not a robot'
      default:
        return 'errorMessage'
    }
  }

  const renderCheckboxContent = () => {
    switch (isStatus) {
      case 'pending':
        return (
          <div className={s.loaderContainer}>
            <CaptchaSpinner />
            <Label className={classNames.label}>I'm not a robot</Label>
          </div>
        )
      case 'verified':
        return (
          <>
            <CheckmarkRecaptcha className={s.check} />
            <Label className={classNames.label}>I'm not a robot</Label>
          </>
        )
      default:
        return (
          <>
            <Checkbox className={classNames.checkbox} />
            <Label className={classNames.label}>I'm not a robot</Label>
          </>
        )
    }
  }

  return (
    <div className={classNames.wrapper}>
      <div className={classNames.container} onClick={handleClick}>
        {isStatus === 'expired' && (
          <div className={classNames.errorContainer}>
            <div className={classNames.errorMessage}>{getErrorMessage()}</div>
          </div>
        )}
        <div className={s.checkboxWrapper}>{renderCheckboxContent()}</div>
        <div className={s.privacy}>
          <RecaptchaIcon className={s.icon} />
          <label className={s.recaptcha}>reCAPTCHA</label>
          <div className={s.link}>
            <Link href={'/'}>Privacy</Link>
            <span>-</span>
            <Link href={'/'}>Terms</Link>
          </div>
        </div>
      </div>

      {(isStatus === 'error' || isStatus === 'notVerified') && (
        <div className={classNames.errorContainer}>
          <div className={classNames.errorMessage}>{getErrorMessage()}</div>
        </div>
      )}
    </div>
  )
}

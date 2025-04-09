import clsx from 'clsx'
import s from './Recaptcha.module.scss'
import { RecaptchaIcon } from '@/public'
import { Сheckbox } from '@/shared/components'
import { CaptchaSpinner } from '@/shared/components'
import { Label } from '@/shared/components'
import Link from 'next/link'

type RecaptchaStatus = 'idle' | 'pending' | 'verified' | 'error' | 'expired' | 'notVerified'

type RecaptchaProps = {
  className?: string
  id?: string
  label?: string
  isStatus?: RecaptchaStatus
  errorMessage?: string
  onVerify?: () => void
}

export const Recaptcha = ({
  className,
  isStatus = 'idle',
  errorMessage = 'Verification failed',
  onVerify,
}: RecaptchaProps) => {
  const classNames = {
    wrapper: clsx(s.wrapper, {
      [s.wrapperError]:
        isStatus === 'error' || isStatus === 'verified' || isStatus === 'notVerified',
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
    verifiedMessage: clsx(s.verifiedMessage),
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
      case 'error':
        return errorMessage
      case 'verified':
        return 'Verification successful'
      default:
        return ''
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
        <div className={s.checkboxWrapper}>
          {isStatus === 'pending' ? (
            <div className={s.loaderContainer}>
              <CaptchaSpinner />
              <Label className={classNames.label}>I'm not a robot</Label>
            </div>
          ) : (
            <>
              <Сheckbox
                recaptchaMode={true}
                cheked={isStatus === 'verified'}
                className={classNames.checkbox}
              />
              <Label className={classNames.label}>I'm not a robot</Label>
            </>
          )}
        </div>
        <RecaptchaIcon className={s.icon} />
        <Link href={'/'}>Privacy</Link>
        <span>-</span>
        <Link href={'/'}>Terms</Link>
      </div>

      {(isStatus === 'error' || isStatus === 'notVerified') && (
        <div className={classNames.errorContainer}>
          <div className={classNames.errorMessage}>{getErrorMessage()}</div>
        </div>
      )}
    </div>
  )
}

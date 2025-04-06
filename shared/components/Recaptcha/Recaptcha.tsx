import clsx from 'clsx'
import s from './Recaptcha.module.scss'
import RecaptchIcon from '../../../public/icons/Recaptcha'
import { Сheckbox } from '../Сheckbox/Сheckbox'
import { CaptchaSpinner } from '../CaptchaSpinner'

type RecaptchaStatus = 'idle' | 'pending' | 'verified' | 'error'

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
      [s.wrapperError]: isStatus === 'error',
    }),
    container: clsx(s.container, className, {
      [s.verified]: isStatus === 'verified',
      [s.error]: isStatus === 'error',
      [s.pending]: isStatus === 'pending',
    }),
    checkbox: clsx(s.checkbox),
    label: clsx(s.label, {
      [s.labelDisabled]: isStatus === 'pending',
    }),
    errorContainer: clsx(s.errorContainer),
    errorMessage: clsx(s.errorMessage),
  }

  const handleClick = () => {
    if (isStatus === 'idle' && onVerify) {
      onVerify()
    }
  }

  return (
    <>
      {isStatus === 'error' && (
        <div className={classNames.errorContainer}>
          <div className={classNames.errorMessage}>{errorMessage}</div>
        </div>
      )}
      <div className={classNames.container} onClick={handleClick}>
        <div className={s.checkboxWrapper}>
          {isStatus === 'pending' ? (
            <CaptchaSpinner />
          ) : (
            <Сheckbox
              cheked={isStatus === 'verified'}
              className={classNames.checkbox}
              label={'I’m not a robot'}
            />
          )}
        </div>
        <RecaptchIcon className={s.icon} />
      </div>
    </>
  )
}

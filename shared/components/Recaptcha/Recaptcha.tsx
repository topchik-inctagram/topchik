import clsx from 'clsx'
import s from './Recaptcha.module.scss'
import RecaptchIcon from '../../../public/icons/Recaptcha'
import { Сheckbox } from '../Сheckbox/Сheckbox'

type RecaptchaStatus = 'idle' | 'pending' | 'verified' | 'error'

type RecaptchaProps = {
  className?: string
  id?: string
  label?: string
  IsStatus?: RecaptchaStatus
  errorMessage?: string
  onVerify?: () => void
}

export const Recaptcha = ({
  className,
  label = 'I’m not a robot',
  IsStatus = 'idle',
  errorMessage = 'Verification failed',
  onVerify,
}: RecaptchaProps) => {
  const classNames = {
    wrapper: clsx(s.wrapper, {
      [s.wrapperError]: IsStatus === 'error',
    }),
    container: clsx(s.container, className, {
      [s.verified]: IsStatus === 'verified',
      [s.error]: IsStatus === 'error',
      [s.pending]: IsStatus === 'pending',
    }),
    checkbox: clsx(s.checkbox),
    label: clsx(s.label, {
      [s.labelDisabled]: IsStatus === 'pending',
    }),
    errorContainer: clsx(s.errorContainer),
    errorMessage: clsx(s.errorMessage),
  }

  const handleClick = () => {
    if (IsStatus === 'idle' && onVerify) {
      onVerify()
    }
  }

  return (
    <>
      <div className={classNames.wrapper}>
        <div className={classNames.container} onClick={handleClick}>
          <div className={s.checkboxWrapper}>
            {IsStatus === 'pending' ? (
              <span className={s.loader}></span>
            ) : (
              <Сheckbox
                cheked={IsStatus === 'verified'}
                disabled={IsStatus === 'pending'}
                className={s.checkbox}
              />
            )}
          </div>

          <span className={classNames.label}>{label}</span>
          <RecaptchIcon className={s.icon} />
        </div>
      </div>
      {IsStatus === 'error' && (
        <div className={classNames.errorContainer}>
          <div className={classNames.errorMessage}>{errorMessage}</div>
        </div>
      )}
    </>
  )
}

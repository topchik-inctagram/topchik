import s from './CaptchaSpinner.module.scss'

type CaptchaSpinnerProps = {
  onComplete?: (complete: boolean) => void
}

export const CaptchaSpinner = ({ onComplete }: CaptchaSpinnerProps) => {
  return <span className={s.loader} onAnimationEnd={() => onComplete?.(true)}></span>
}

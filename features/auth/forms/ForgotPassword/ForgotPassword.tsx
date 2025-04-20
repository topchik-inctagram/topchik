'use client'

import { Button, Card, ControlledInput, Typography } from '@/shared/components'
import Link from 'next/link'
import { type Control, type FieldErrors } from 'react-hook-form'
import s from './ForgotPassword.module.scss'
import clsx from 'clsx'
import { PublicPages } from '@/shared/enums'
import { Recaptcha, type RecaptchaStatus } from '@/shared/components/Recaptcha'

type FormTypes = {
  email: string
}

type Props = {
  onSubmit: () => void
  isVerified: boolean
  control: Control<FormTypes>
  errors: FieldErrors<FormTypes>
  isValid: boolean
  isLoading: boolean
  recaptchaStatus: RecaptchaStatus
  onVerifyRecaptcha: () => void
}

export const ForgotPassword = ({
  onSubmit,
  isVerified,
  control,
  errors,
  isLoading,
  isValid,
  recaptchaStatus,
  onVerifyRecaptcha,
}: Props) => {
  const classNames = {
    cardContainer: clsx(s.cardContainer, isVerified && s.verifiedContainer),
    title: s.title,
    formContainer: s.formContainer,
    emailInput: s.emailInput,
    forgotPasswordLink: clsx(s.forgotPasswordLink, isVerified && s.verifiedForgotPasswordLink),
    notificationEmail: s.notificationEmail,
    buttonSendLink: s.buttonSendLink,
    backToSignIn: clsx(s.backToSignIn, isVerified && s.verifiedBackToSignIn),
  }

  return (
    <Card className={classNames.cardContainer}>
      <Typography as="h2" className={classNames.title} variant="h1">
        Forgot Password
      </Typography>
      <form className={classNames.formContainer} onSubmit={onSubmit}>
        <ControlledInput
          autoComplete="email"
          className={classNames.emailInput}
          control={control}
          error={errors.email?.message}
          label="Email"
          name="email"
          placeholder="example@yourmail.com"
          type="email"
        />
        <Typography className={classNames.forgotPasswordLink} variant="regular_14">
          Enter your email address and we will send you further instructions
        </Typography>

        {isVerified && (
          <div className={classNames.notificationEmail}>
            <Typography variant="regular_14">The link has been sent by email.</Typography>
            <Typography variant="regular_14">
              If you don’t receive an email send link again
            </Typography>
          </div>
        )}

        <Button
          fullWidth
          className={classNames.buttonSendLink}
          disabled={!isValid || isLoading}
          type="submit"
        >
          {isLoading ? 'Sending...' : `Send Link${isVerified ? ' Again' : ''}`}
        </Button>
      </form>

      <Button asChild fullWidth className={classNames.backToSignIn} variant="miniOutlined">
        <Link href={PublicPages.signIn}>Back to Sign In</Link>
      </Button>
      {!isVerified && (
        <div className={s.recaptchaWrapper}>
          <Recaptcha isStatus={recaptchaStatus} onVerify={onVerifyRecaptcha} />
        </div>
      )}

      {!isVerified && <div style={{ height: '84px', width: '300px' }} />}
    </Card>
  )
}

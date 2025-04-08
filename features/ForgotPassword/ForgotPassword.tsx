'use client'

import { Button, Card, ControlledInput, Typography } from '@/shared/components'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import s from './ForgotPassword.module.scss'
import clsx from 'clsx'

const schema = z.object({
  email: z.string().email('Enter your email'),
})

type FormTypes = z.infer<typeof schema>
type Props = {
  onSubmit: (data: FormTypes) => void
  isVerified: boolean
}

export const ForgotPassword = ({ onSubmit, isVerified }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormTypes>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(schema),
  })
  //todo add Devtool when it will be fixed by dev

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
      <form className={classNames.formContainer} onSubmit={handleSubmit(onSubmit)}>
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
        <Button fullWidth className={classNames.buttonSendLink} type="submit">
          Send Link {isVerified && 'Again'}
        </Button>
      </form>
      <Button asChild fullWidth className={classNames.backToSignIn} variant="miniOutlined">
        <Link href="#">Back to Sign In</Link>
      </Button>
      {!isVerified && (
        <div style={{ height: '84px', width: '300px', backgroundColor: 'red' }}></div>
      )}
    </Card>
  )
}

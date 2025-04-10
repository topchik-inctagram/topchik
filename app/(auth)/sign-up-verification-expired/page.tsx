'use client'

import { useState } from 'react'
import { Button, Input, PageContainer, Typography } from '@/shared/components'
import { TimeManagement } from '@/public/icons'
import s from './page.module.scss'

const Page = () => {
  const [userEmail, setUserEmail] = useState('')

  return (
    <PageContainer mt="35px">
      <Typography className={s.title} variant="h1">
        Email verification link expired
      </Typography>
      <Typography className={s.description} variant="regular_16">
        Looks like the verification link has expired. Not to worry, we can send the link again
      </Typography>
      <Input
        autoComplete="email"
        className={s.userEmailInput}
        label="Email"
        placeholder="Epam@epam.com"
        type="email"
        value={userEmail}
        onChangeValue={setUserEmail}
      />
      <Button className={s.button}>Resend verification link</Button>
      <TimeManagement />
    </PageContainer>
  )
}

export default Page

'use client'
import { Button, PageContainer, Typography } from '@/shared/components'

import s from './page.module.scss'
import { TimeManagement } from '@/public/icons'

const Page = () => {
  return (
    <PageContainer mt="35px">
      <Typography className={s.title} variant="h1">
        Email verification link expired
      </Typography>
      <Typography className={s.description} variant="regular_16">
        Looks like the verification link has expired. Not to worry, we can send the link again
      </Typography>
      <Button className={s.button}>Resend link</Button>
      <TimeManagement />
    </PageContainer>
  )
}

export default Page

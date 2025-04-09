import { Button, PageContainer, Typography } from '@/shared/components'
import { TimeManagement } from '@/public'
import s from './page.module.scss'

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

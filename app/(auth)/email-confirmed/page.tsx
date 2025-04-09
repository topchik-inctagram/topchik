import { Button, PageContainer, Typography } from '@/shared/components'
import Link from 'next/link'
import { SignUpBro } from '@/public/icons'
import s from './page.module.scss'

const Page = () => {
  return (
    <PageContainer mt="35px">
      <Typography className={s.title} variant="h1">
        Congratulations!
      </Typography>
      <Typography className={s.notification} variant="regular_16">
        Your email has been confirmed
      </Typography>
      <Button asChild className={s.button}>
        <Link href="/sign-in">Sign In</Link>
      </Button>
      <SignUpBro />
    </PageContainer>
  )
}

export default Page

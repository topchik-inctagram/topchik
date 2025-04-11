'use client'
import { Button, PageContainer, Typography } from '@/shared/components'
import Link from 'next/link'
import { SignUpBro } from '@/public/icons'
import s from './page.module.scss'
import { useConfirmEmailMutation } from '@/features/auth/api'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const Page = () => {
  const [confirmEmail] = useConfirmEmailMutation()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const confirm = async () => {
      try {
        if (code) {
          await confirmEmail({ code })
          setIsChecking(false)
        }
      } catch {
        router.replace('/sign-up-verification-expired')
      }
    }
    confirm()
  }, [code])

  if (isChecking) {
    return <div></div>
  }

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

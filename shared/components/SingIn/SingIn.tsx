import { Button, Card, Input, Typography } from '@/shared/components'
import Link from 'next/link'
import { Github, Google } from '@/public'
import s from './SignIn.module.scss'

type Props = {
  onSubmit: () => void
}

export const SingIn = ({ onSubmit }: Props) => {
  return (
    <Card className={s.cardContainer}>
      <Typography as="h1" variant="h1">
        Sign In
      </Typography>
      <div>
        <Link href="#">
          <Google />
        </Link>
        <Link href="#">
          <Github />
        </Link>
      </div>
      <form onSubmit={onSubmit}>
        <Input label="Email" type="email" />
        <Input label="Password" type="password" />
        <Link href="#">Forgot Password</Link>
        <Button>Sign In</Button>
      </form>
      <Typography variant="regular_16">Don’t have an account?</Typography>
      <Button asChild variant="miniOutlined">
        <Link href="#">Sign Up</Link>
      </Button>
    </Card>
  )
}

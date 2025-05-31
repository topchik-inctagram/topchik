import { Checkbox, Container, RadioGroup, Typography } from '@/shared/components'
import { useState } from 'react'
import s from './AccountManagement.module.scss'
import { RadioItem } from '@/shared/components/RadioGroup/RadioItem'
import { Paypal, Stripe } from '@/public/icons'

type Props = {
  paymentCompleted: boolean
  setPaymentCompleted: () => void
}

const AccountManagement = ({ paymentCompleted, setPaymentCompleted }: Props) => {
  const [accountType, setAccountType] = useState<'personal' | 'business'>('personal')

  return (
    <Container maxWidth align="start" className={s.container} direction="column">
      {accountType === 'business' && paymentCompleted && (
        <div className={s.block}>
          <Typography as="h3" variant="bold_16">
            Current Subscription:
          </Typography>

          <div className={s.subscriptionInfo}>
            <div className={s.subscriptionDateBlock}>
              <Typography className={s.textColor} variant="regular_14">
                Expire at
              </Typography>
              <Typography variant="bold_14">12.02.2022</Typography>
            </div>

            <div className={s.subscriptionDateBlock}>
              <Typography className={s.textColor} variant="regular_14">
                Next payment
              </Typography>
              <Typography variant="bold_14">13.02.2022</Typography>
            </div>
          </div>

          <Checkbox className={s.checkbox} label="Auto-Renewal" />
        </div>
      )}

      <div className={s.block}>
        <Typography as="h3" variant="bold_16">
          Account type:
        </Typography>
        <div className={s.radioGroup}>
          <RadioGroup
            value={accountType}
            onValueChange={val => setAccountType(val as 'personal' | 'business')}
          >
            <RadioItem value="personal">Personal</RadioItem>
            <RadioItem value="business">Business</RadioItem>
          </RadioGroup>
        </div>
      </div>

      {accountType === 'business' && (
        <div className={s.businessBlock}>
          <div className={s.block}>
            <Typography as="h3" variant="bold_16">
              Your subscription costs:
            </Typography>
            <div className={s.radioGroup}>
              <RadioGroup defaultValue="day">
                <RadioItem value="day">$10 per 1 Day</RadioItem>
                <RadioItem value="week">$50 per 7 Day</RadioItem>
                <RadioItem value="month">$100 per month</RadioItem>
              </RadioGroup>
            </div>
          </div>

          <div className={s.payment}>
            <Paypal className={s.icon} />
            <Typography>Or</Typography>
            <Stripe className={s.icon} />
          </div>
        </div>
      )}
    </Container>
  )
}

export default AccountManagement

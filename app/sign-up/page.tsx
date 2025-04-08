'use client'
import { PageContainer } from '@/shared/components'
import { SignUp } from '@/features'
import { useRegistrationUserMutation } from '@/features/api/auth'

const Page = () => {
  const [registration, {error, isLoading, ...rest}] = useRegistrationUserMutation()
  const SubmitHandler = async (data: any) => {
    try {
      await registration(data)
      console.log(data)
    } catch (error: any) {
      console.log(error)
    }
  }
  return (
    <PageContainer>
      <SignUp onSubmit={SubmitHandler} />
    </PageContainer>
  )
}

export default Page

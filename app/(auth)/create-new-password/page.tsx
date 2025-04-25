'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  useCheckRecoveryCodeMutation,
  useNewPasswordMutation,
  useDeleteAllDevicesMutation,
} from '@/features/auth/api'
import { CreateNewPassword } from '@/features/auth/forms/CreateNewPassword'
import { PageContainer, Toast } from '@/shared/components'
import { PublicPages } from '@/shared/enums'

const Page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const recoveryCode = searchParams.get('recoveryCode')

  const [checkRecoveryCode] = useCheckRecoveryCodeMutation()
  const [newPassword, { isLoading }] = useNewPasswordMutation()
  const [deleteAllDevices] = useDeleteAllDevicesMutation()

  const [isCodeValid, setIsCodeValid] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (!recoveryCode) {
      router.replace(PublicPages.passwordRecoveryVerificationExpired)
      return
    }

    checkRecoveryCode({ recoveryCode })
      .unwrap()
      .then(() => setIsCodeValid(true))
      .catch(() => {
        router.replace(PublicPages.passwordRecoveryVerificationExpired)
      })
  }, [checkRecoveryCode, router, recoveryCode])

  const handleSubmit = async (data: { password: string; confirmPassword: string }) => {
    setError(null)
    setShowToast(false)
    try {
      await newPassword({
        recoveryCode: recoveryCode!,
        newPassword: data.password,
      }).unwrap()
      setShowToast(true)
      await deleteAllDevices().unwrap()
      localStorage.removeItem('recovery-email')
      router.push('/sign-in')
    } catch (e: any) {
      setError(e?.data?.errorsMessages[0].message)
      setShowToast(true)
    }
  }

  if (!isCodeValid) {
    return null
  }

  return (
    <PageContainer mt="36px">
      {showToast && error && (
        <Toast description={error} open={showToast} variant="error" onOpenChange={setShowToast} />
      )}
      <CreateNewPassword isLoading={isLoading} onSubmit={handleSubmit} />
    </PageContainer>
  )
}

export default Page

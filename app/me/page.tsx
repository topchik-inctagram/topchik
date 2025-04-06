'use client'
import { PageContainer } from '@/shared/components'
import { useMeQuery } from '@/features/api/auth'

const UserCountPage = () => {
  const { data } = useMeQuery()

  return (
    <PageContainer>
      <span>Koli4esto polzavatelej: {data ? data.toString() : ''}</span>
    </PageContainer>
  )
}

export default UserCountPage

'use client'
import { PageContainer } from '@/shared/components'
import withAuth from '@/shared/HOC/withAuth'
import { Navbar } from '@/widgets/Navbar'

function ProfilePage() {
  return (
    <PageContainer>
      <Navbar>
        <div>FUTURE PROFILE</div>
      </Navbar>
    </PageContainer>
  )
}

export default withAuth(ProfilePage)

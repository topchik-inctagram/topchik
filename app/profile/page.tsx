'use client'
import withAuth from '@/shared/HOC/withAuth'
import { Navbar } from '@/widgets/Navbar'

function ProfilePage() {
  return (
    <>
      <Navbar />
      <div style={{ marginLeft: '300px' }}>FUTuRE PROFILE</div>
      <div style={{ marginLeft: '300px' }}>FUTuRE PROFILE</div>
      <div style={{ marginLeft: '300px' }}>FUTuRE PROFILE</div>
    </>
  )
}

export default withAuth(ProfilePage)

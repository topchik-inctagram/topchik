'use client'

import { Navbar } from '@/widgets/Navbar'
import { withAuth } from '@/shared/HOC'

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

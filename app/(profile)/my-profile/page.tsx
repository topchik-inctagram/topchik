'use client'

import { withAuth } from '@/shared/HOC'
import { FollowToggleButton, SendMessageButton, ProfileSettingsButton } from '@/entities/user/ui'

function MyProfilePage() {
  return (
    <>
      <section style={{ marginLeft: '300px' }}>
        <h2>UserName</h2>
        <FollowToggleButton userId="1111"/>
        <SendMessageButton/>
        <ProfileSettingsButton/>
      </section>
      <div style={{ marginLeft: '300px' }}>FUTuRE PROFILE</div>
      <div style={{ marginLeft: '300px' }}>FUTuRE PROFILE</div>
    </>
  )
}
export default withAuth(MyProfilePage)

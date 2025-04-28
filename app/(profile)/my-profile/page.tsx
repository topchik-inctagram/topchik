'use client'

import { withAuth } from '@/shared/HOC'
import { UserProfile } from '@/widgets/userProfile/UserProfile'
import { PageContainer } from '@/shared/components'

function MyProfilePage() {
  const user = {
    avatarUrl: '/photos/Avatar.webp',
    userName: 'URLProfile',
    followers: 2358,
    following: 2218,
    publications: 2764,
    userId: '123',
  }

  return (
    <PageContainer direction="column" mt="36px" pl="24px" pr="64px">
      <UserProfile
        avatarUrl={user.avatarUrl}
        followersCount={user.followers}
        followingCount={user.following}
        publicationsCount={user.publications}
        userId={user.userId}
        userName={user.userName}
      />
    </PageContainer>
  )
}
export default withAuth(MyProfilePage)

'use client'

import { withAuth } from '@/shared/HOC';
import {PageContainer} from '@/shared/components'
import {ImagesGallery} from '@/features/posts/imagesOfPosts';
import {UserProfile} from '@/widgets/userProfile';


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
    <PageContainer as="div" direction="column" maxWidth="1300px" mt="36px" pl="24px" pr="64px">
      <UserProfile
        isMyProfile
        avatarUrl={user.avatarUrl}
        followersCount={user.followers}
        followingCount={user.following}
        publicationsCount={user.publications}
        userId={user.userId}
        userName={user.userName}/>
      <ImagesGallery/>
    </PageContainer>
  )
}
export default withAuth(MyProfilePage)

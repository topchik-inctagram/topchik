'use client'

import { withAuth } from '@/shared/HOC';
import {PageContainer, Typography} from '@/shared/components'
import {ImagesGallery} from '@/features/posts/imagesOfPosts';
import {UserProfile} from '@/widgets/userProfile';
import {useMeQuery} from '@/features/auth/api';


function MyProfilePage() {

  const { data: me, isLoading } = useMeQuery()

  if (isLoading || !me) {
    return <Typography>Загрузка профиля...</Typography>
  }

  const { id, username, profile } = me

  const user = {
    avatarUrl: profile?.avatarInfo?.mediumFilePath || '/photos/Avatar.webp',
    userName: {username},
    followers: 2358,
    following: 2218,
    publications: 2764,
    userId: id
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
        userName={username}/>
      <ImagesGallery userId={id}/>
    </PageContainer>
  )
}
export default withAuth(MyProfilePage)

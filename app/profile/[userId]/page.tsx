'use client'

import {PageContainer, Typography} from '@/shared/components'
import {ImagesGallery} from '@/features/posts/imagesOfPosts';
import {UserProfile} from '@/widgets/userProfile';
import {useParams} from 'next/navigation';


function ProfilePage() {

  const params = useParams()
  const userId = String(params.userId)

  if (!userId) {
    return <Typography>Загрузка профиля...</Typography>
  }


  const user = {
    avatarUrl: '/photos/Avatar.webp',
    userName: 'Someone Else',
    followers: 2358,
    following: 2218,
    publications: 2764,
    userId: 55,
  }

  return (
    <PageContainer as="div" direction="column" maxWidth="1300px" mt="36px" pl="24px" pr="64px">
      <UserProfile
        isAuth
        avatarUrl={user.avatarUrl}
        followersCount={user.followers}
        followingCount={user.following}
        isMyProfile={false}
        publicationsCount={user.publications}
        userId={userId}
        userName={user.userName}/>
      <ImagesGallery userId={userId}/>
    </PageContainer>
  )
}
export default ProfilePage

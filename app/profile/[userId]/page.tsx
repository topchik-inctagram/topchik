'use client'

import {PageContainer, Typography} from '@/shared/components'
import {ImagesGallery} from '@/features/posts/imagesOfPosts';
import {UserProfile} from '@/widgets/userProfile';
import {useParams} from 'next/navigation';
import {useMeQuery} from '@/features/auth/api';


function ProfilePage() {

  const { data: meData, isLoading } = useMeQuery()
  const userId = String(useParams().userId)

  const isMyProfile = !!meData && meData?.id === userId

  if (isLoading) {
    return <Typography>Загрузка профиля...</Typography>
  }


  const user = {
    avatarUrl: isMyProfile
      ? meData?.profile?.avatarInfo?.mediumFilePath || '/photos/Avatar.webp'
      : '/photos/Avatar.webp',
    userName: isMyProfile ? meData.username : 'Someone Else',
    followers: 2358,
    following: 2218,
    publications: 2764,
    userId: isMyProfile
      ? meData?.id
      : '55',   // потом использовать просто userId
  }

  return (
    <PageContainer as="div" direction="column" maxWidth="1300px" mt="36px" pl="24px" pr="64px">
      <UserProfile
        isAuth
        avatarUrl={user.avatarUrl}
        followersCount={user.followers}
        followingCount={user.following}
        meData={meData}
        publicationsCount={user.publications}
        userId={userId}
        userName={user.userName}/>
      <ImagesGallery userId={userId}/>
    </PageContainer>
  )
}
export default ProfilePage

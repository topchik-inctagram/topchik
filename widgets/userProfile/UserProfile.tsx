import s from './UserProfile.module.scss'
import { Container, Typography } from '@/shared/components'
import Image from 'next/image'
import { ProfileSettingsButton, FollowToggleButton, SendMessageButton } from '@/entities/user/ui'

type Props = {
  avatarUrl: string
  userName: string
  about?: string
  followersCount: number
  followingCount: number
  publicationsCount: number
  meData?: { id: string }
  isAuth?: boolean
  userId: string
  isFollowing?: boolean
}

export const UserProfile = ({
  avatarUrl,
  userName,
  followingCount,
  followersCount,
  publicationsCount,
  meData,
  isAuth,
  userId,
  about,
}: Props) => {
  const isMyProfile = userId === meData?.id

  return (
    <Container className={s.profile}>
      <Image alt={userName} className={s.avatar} height={204} src={avatarUrl} width={204} />
      <div className={s.info}>
        <div className={s.actions}>
          <Typography as="h1" className={s.name} variant="h1">
            {userName}
          </Typography>
          {isMyProfile && <ProfileSettingsButton />}
          {!isMyProfile && isAuth && (
            <div className={s.followAndMessageButtonGroup}>
              <FollowToggleButton />
              <SendMessageButton />
            </div>
          )}
        </div>

        <dl className={s.details}>
          <div className={s.detail} role="group">
            <dt>
              <Typography variant="bold_14">{followingCount}</Typography>
            </dt>
            <dd className={s.countsOfDetail}>
              <Typography variant="regular_14">Following</Typography>
            </dd>
          </div>
          <div className={s.detail} role="group">
            <dt>
              <Typography variant="bold_14">{followersCount}</Typography>
            </dt>
            <dd className={s.countsOfDetail}>
              <Typography variant="regular_14">Followers</Typography>
            </dd>
          </div>
          <div className={s.detail} role="group">
            <dt>
              <Typography variant="bold_14">{publicationsCount}</Typography>
            </dt>
            <dd className={s.countsOfDetail}>
              <Typography variant="regular_14">Publications</Typography>
            </dd>
          </div>
        </dl>

        <Typography className={s.name} variant="regular_16">
          {about ? about : 'No bio provided.'}
        </Typography>
      </div>
    </Container>
  )
}

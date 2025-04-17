import s from './UserProfile.module.scss'
import {Typography} from '@/shared/components';
import Image from 'next/image';
import Link from 'next/link';
import {ProfileSettingsButton, FollowToggleButton, SendMessageButton} from '@/entities/user/ui'

type Props = {
    avatarUrl: string
    userName: string
    about?: string
    followersCount: number
    followingCount: number
    publicationsCount: number
    isMyProfile?: boolean
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
  isMyProfile,
  isAuth,
  userId,
  about}: Props) => {
  return (
    <section className={s.profile}>
      <Image alt={userName} className={s.avatar} height={204} src={avatarUrl} width={204} />
      <div className={s.info}>
        <div className={s.actions}>
          <Typography as="h1" className={s.name} variant="h1">
            {userName}
          </Typography>

          {isMyProfile && <ProfileSettingsButton />}
          {!isMyProfile && isAuth && (
            <div className={s.followAndMessageButtonGroup}>
              <FollowToggleButton userId={userId} />
              <SendMessageButton />
            </div>
          )}
        </div>
        <dl className={s.details}>
          <div className={s.detail}>
            <dd className={s.countsOfDetail}><Typography as="p" variant="bold_14">{followingCount}</Typography></dd>
            <dt><Typography as="p" variant="regular_14">Following</Typography></dt>
          </div>
          <div className={s.detail}>
            <dd className={s.countsOfDetail}><Typography as="p" variant="bold_14">{followersCount}</Typography></dd>
            <dt><Typography as="p" variant="regular_14">Followers</Typography></dt>
          </div>
          <div className={s.detail}>
            <dd className={s.countsOfDetail}><Typography as="p" variant="bold_14">{publicationsCount}</Typography></dd>
            <dt><Typography as="p" variant="regular_14">Publications</Typography></dt>
          </div>
        </dl>
        <Typography as="p" className={s.name} variant="regular_16">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim quis nostrud exercitation ullamco <Typography as={Link} href="#">laboris nisi ut aliquip ex ea commodo consequat.</Typography>
        </Typography>
      </div>
    </section>
  )
}
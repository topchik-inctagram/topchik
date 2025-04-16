import s from './UserProfile.module.scss'
import {Typography} from '@/shared/components';
import Image from 'next/image';

type Props = {
    avatarUrl?: string
    userName?: string

}

export const UserProfile = ({avatarUrl, userName}: Props) => {
  return (
    <section className={s.profile}>
      <Image alt={userName || 'URLProfile'} className={s.avatar} height={204} src={avatarUrl || '/photos/Avatar.webp'} width={204} />
      <div className={s.info}>
        <Typography as="h1" className={s.name} variant="h1">
          {userName || 'URLProfile'}
        </Typography>
        <dl className={s.details}>
          <div className={s.detail}>
            <dd className={s.countsOfDetail}>2 218</dd>
            <dt className={s.titleOfDetail}>Following</dt>
          </div>
          <div className={s.detail}>
            <dd className={s.countsOfDetail}>2 358</dd>
            <dt className={s.titleOfDetail}>Followers</dt>
          </div>
          <div className={s.detail}>
            <dd className={s.countsOfDetail}>2 764</dd>
            <dt className={s.titleOfDetail}>Publications</dt>
          </div>
        </dl>
        <Typography as="p" className={s.name} variant="regular_16">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco <Typography as="a">laboris nisi ut aliquip ex ea commodo consequat.</Typography>
        </Typography>
      </div>
    </section>
  )
}
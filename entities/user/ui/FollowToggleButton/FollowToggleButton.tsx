'use client'

import { Button } from '@/shared/components'
import { useState } from 'react'
import s from './FollowToggleButton.module.scss'


export const FollowToggleButton = () => {
  const [isFollowing, setIsFollowing] = useState(false)

  const handleClick = () => {
    setIsFollowing(!isFollowing)
  }
  return (
    <Button className={s.button}
      variant={isFollowing ? 'outlined' : 'primary'}
      onClick={handleClick}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  )
}
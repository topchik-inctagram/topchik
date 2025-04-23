'use client'

import { Button } from '@/shared/components'
import { useState } from 'react'


export const FollowToggleButton = ({ userId }: { userId: string }) => {
  const [isFollowing, setIsFollowing] = useState(false)

  const handleClick = () => {
    setIsFollowing(!isFollowing)
  }
  return (
    <Button style={{minWidth: '120px'}}
      variant={isFollowing ? 'outlined' : 'primary'}
      onClick={handleClick}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  )
}
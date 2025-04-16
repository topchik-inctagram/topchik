'use client'

import { withAuth } from '@/shared/HOC'
import {UserProfile} from '@/widgets/userProfile/UserProfile';

function MyProfilePage() {
  return (
    <UserProfile/>
  )
}
export default withAuth(MyProfilePage)

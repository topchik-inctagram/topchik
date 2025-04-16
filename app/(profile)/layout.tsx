import {type ReactNode} from 'react';
import {Navbar} from '@/widgets/Navbar';
import {ProfileLayoutWrapper} from '@/shared/layouts';


export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <ProfileLayoutWrapper>
      <Navbar />
      <main>{children}</main>
    </ProfileLayoutWrapper>
  )
}

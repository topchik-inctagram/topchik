import {type ReactNode} from 'react';
import {Navbar} from '@/widgets/Navbar';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

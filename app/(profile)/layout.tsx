import { type ReactNode } from 'react'
import { Navbar } from '@/widgets/Navbar'
import { PageContainer } from '@/shared/components'

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <PageContainer direction="row" mt="0">
      <Navbar />
      <main>{children}</main>
    </PageContainer>
  )
}

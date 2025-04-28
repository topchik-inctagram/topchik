'use client'
import '../styles/index.scss'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import { store } from '@/shared/store'
import { Provider } from 'react-redux'
import { PageContainer } from '@/shared/components'
import { RegisteredUsersBar } from '@/entities/RegisteredUsersBar'
import { PostsGallery } from '@/features/PostsGallery'

export default function HomePage() {
  return (
    <Provider store={store}>
      <PageContainer direction="column" pl="154px" pr="154px">
        <RegisteredUsersBar usersCount={3000} />
        <PostsGallery />
      </PageContainer>
    </Provider>
  )
}

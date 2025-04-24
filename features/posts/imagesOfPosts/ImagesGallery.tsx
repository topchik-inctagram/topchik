import {useEffect, useState} from 'react'
import {type Cursor, useGetUserIdPostsQuery, type UserPost} from '@/features/posts/api';
import {Container, Typography} from '@/shared/components';
import Image from 'next/image';
import s from './ImagesGallery.module.scss'



const TestPics = [
  {
    id: 1,
    smallFilePath: '/photos/pic1.webp',
  },
  {
    id: 2,
    smallFilePath: '/photos/pic2.webp',
  },
  {
    id: 3,
    smallFilePath: '/photos/pic3.webp',
  },
  {
    id: 4,
    smallFilePath: '/photos/pic4.webp',
  },
  {
    id: 5,
    smallFilePath: '/photos/pic1.webp',
  },
  {
    id: 6,
    smallFilePath: '/photos/pic2.webp',
  },
  {
    id: 7,
    smallFilePath: '/photos/pic3.webp',
  },
  {
    id: 8,
    smallFilePath: '/photos/pic4.webp',
  }
]

type Props = {
  userId: string
}

export const ImagesGallery = ({userId}: Props) => {
  const [cursor, setCursor] = useState<Cursor>(null)
  const [allPosts, setAllPosts] = useState<UserPost[]>([])

  const {data, isLoading, isError, error} = useGetUserIdPostsQuery({ id: userId,
    cursor })
  const posts = data?.posts

  useEffect(() => {
    if (posts?.length) {
      setAllPosts((prev) => [...prev, ...posts])
    }
  }, [posts])

  const handleLoadMore = () => {
    if (data?.cursor) {
      setCursor(data.cursor)
    }
  }

  if (isLoading) {
    return <Typography as='p' variant="regular_16">Loading posts...</Typography>
  }

  // Если ошибка только из-за отсутствия постов, показываем заглушки
  const showEmptyStub =
      isError &&
      error &&
      'data' in error &&
      typeof error.data === 'object' &&
      (error.data as any)?.errorsMessage === "Post doesn't exist"

  return (
    <Container className={s.imgContainer}>
      {allPosts.length > 0 ? (allPosts?.map((post) => (
        post.images.map((image) => (
          <Image key={image.id} alt="Post image" className={s.image} src={image.smallFilePath}/>
        ))
      ))) : showEmptyStub ? (
        TestPics.map((image) => (
          <div key={image.id} className={s.imgBlock}>
            <Image alt="Post image" className={s.image} height={228} src={image.smallFilePath} width={244}/>
          </div>
        )))
        : (
          <Typography as="p" variant="regular_16">Произошла ошибка при загрузке</Typography>
        )}
      {data?.cursor !== 0 && (
        <button className={s.loadMoreButton} onClick={handleLoadMore}>
            Загрузить ещё
        </button>
      )}
    </Container>
  )
}
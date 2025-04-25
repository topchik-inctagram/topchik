import {useEffect, useRef, useState} from 'react'
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
  const loaderPosts = useRef<HTMLDivElement>(null)


  const {data, isLoading, isError, error} = useGetUserIdPostsQuery({ id: userId,
    cursor }, {
    skip: cursor === 0
  })
  const posts = data?.posts

  useEffect(() => {
    if (posts?.length) {
      setAllPosts((prev) => [...prev, ...posts])
    }
  }, [posts])

  // loading posts with scroll
  useEffect(() => {
    if (!loaderPosts.current) {
      return
    }

    const observer = new IntersectionObserver(entries => {
      const entry = entries[0]
      if (entry.isIntersecting && data?.cursor !== 0) {
        setCursor(data?.cursor ?? null)
      }
    }, {
      rootMargin: '100px',
    })

    observer.observe(loaderPosts.current)

    return () => {
      if (loaderPosts.current) {
        observer.unobserve(loaderPosts.current)
      }
    }
  }, [data?.cursor])

  if (isLoading) {
    return (
      <Container className={s.imgContainer}>
        <Typography>Loading posts...</Typography>
      </Container>
    )
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
      <div ref={loaderPosts} className={s.loaderPosts}></div>
    </Container>
  )
}
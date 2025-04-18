import {useState} from 'react'
import {useGetPostsQuery} from '@/features/posts/api';
import {Typography} from '@/shared/components';
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

export const ImagesGallery = () => {
  const [cursor, setCursor] = useState<number | void>(undefined)
  const {data, isLoading, isError} = useGetPostsQuery(cursor)
  const posts = data?.posts

  const handleLoadMore = () => {
    if (data?.cursor) {
      setCursor(data.cursor)
    }
  }

  if (isLoading) {
    return <Typography as='p' variant="regular_16">Loading posts...</Typography>
  }
  if (isError) {
    return <Typography as='p' variant="regular_16">Failed to load posts</Typography>
  }

  return (
    <section className={s.imgContainer}>
      {posts && posts.length > 0 ? (posts?.map((post) => (
        post.images.map((image) => (
          <Image key={image.id} alt="Post image" className={s.image} src={image.smallFilePath}/>
        ))
      ))) : (
        TestPics.map((image) => (
          <div key={image.id} className={s.imgBlock}>
            <Image alt="Post image" className={s.image} height={228} src={image.smallFilePath} width={244}/>
          </div>
        )) )
      }
      {data?.cursor !== 0 && (
        <button className={s.loadMoreButton} onClick={handleLoadMore}>
                Загрузить ещё
        </button>
      )}
    </section>
  )
}
import { useState } from 'react'
import { useGetPostsQuery } from '@/features/posts/api'
import foto from './../../public/proj1.webp'
import s from './PostsGallery.module.scss'
import { PostCard } from '@/entities/PostCard'
import type { StaticImageData } from 'next/image'
type Props = {
  postImage: StaticImageData
  authorImage: StaticImageData
  postAuthor: string
  postCreated: string
  postText: string
}
const TestPics = [
  {
    postImage: foto,
    authorImage: foto,
    postAuthor: 'John',
    postCreated: '21 april 2025',
    postText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor inipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor incd.mpor incd.mpor incd.mpo223',
  },
  {
    postImage: foto,
    authorImage: foto,
    postAuthor: 'John',
    postCreated: '21 april 2025',
    postText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor inipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor incd.mpor incd.mpor incd.mpo223',
  },
  {
    postImage: foto,
    authorImage: foto,
    postAuthor: 'John',
    postCreated: '21 april 2025',
    postText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor inipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor incd.mpor incd.mpor incd.mpo223',
  },
  {
    postImage: foto,
    authorImage: foto,
    postAuthor: 'John',
    postCreated: '21 april 2025',
    postText:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi atque, consequatur dignissimos ducimus earum eos eharum ipsam, iste molestiae nihil perspiciatis quisreiciendis sequi ullam vel veritatis voluptatem!',
  },
] satisfies Props[]

export const PostsGallery = () => {
  const [cursor, setCursor] = useState<number | null>(null)
  const { data } = useGetPostsQuery(cursor)
  const posts = data?.posts

  const handleLoadMore = () => {
    if (data?.cursor) {
      setCursor(data.cursor)
    }
  }

  return (
    <section className={s.container}>
      {TestPics.map((t, i) => (
        <PostCard
          key={i}
          authorImage={t.authorImage}
          postAuthor={t.postAuthor}
          postCreated={t.postCreated}
          postImage={t.postImage}
          postText={t.postText}
        />
      ))}
    </section>
  )
}

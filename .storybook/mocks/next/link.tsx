import React, { useContext } from 'react'
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import type Link from 'next/link'

const MockedLink: any = ({
  href,
  children,
  onClick,
  ...props
}: React.ComponentProps<typeof Link>) => {
  const router = useContext(AppRouterContext)
  console.log('BLANK LINK RENDER')
  console.log('BLANK LINK RENDER')
  console.log('BLANK LINK RENDER')
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    // Имитируем навигацию
    if (router) {
      router.push(href.toString())
    }

    onClick?.(e)
  }

  return (
    <a href={href.toString()} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}

export default MockedLink

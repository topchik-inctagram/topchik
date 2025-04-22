import type { Preview } from '@storybook/react'
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { mswLoader } from 'msw-storybook-addon'
import '../styles/index.scss'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/roboto/400.css'
import { useState } from 'react'

export const decorators = [
  (Story: any, context: any) => {
    const [currentPath, setCurrentPath] = useState('/')
    const [searchParams, setSearchParams] = useState(new URLSearchParams())

    return (
      <AppRouterContext.Provider
        value={{
          push: href => {
            const [path, query] = href.toString().split('?')
            setCurrentPath(path)
            setSearchParams(new URLSearchParams(query))
            return Promise.resolve(true)
          },
          replace: href => {
            const [path, query] = href.toString().split('?')
            setCurrentPath(path)
            setSearchParams(new URLSearchParams(query))
            return Promise.resolve(true)
          },
          prefetch: () => Promise.resolve(),
          refresh: () => {},
          back: () => {},
          forward: () => {},
        }}
      >
        <Story />
      </AppRouterContext.Provider>
    )
  },
]
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    decorators: [decorators],
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
        query: {},
      },
    },
    msw: {
      handlers: [],
    },
    loaders: [mswLoader],
  },
}

export default preview

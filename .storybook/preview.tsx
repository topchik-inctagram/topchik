import type { Preview } from '@storybook/react'
import {AppRouterContext} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {mswLoader} from "msw-storybook-addon"
import '../styles/index.scss'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

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
            handlers: []
        },
        loaders: [mswLoader],
    },
}


export default preview;
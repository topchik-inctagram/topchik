import type {Preview} from '@storybook/react'
import '../styles/index.scss'
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import {Toaster} from "sonner";


const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: Story => (
        <>
            <Toaster/>
            <Story/>
        </>
    )
};

export default preview;
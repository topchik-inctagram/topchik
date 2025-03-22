import type {Meta, StoryObj} from "@storybook/react";
import {Typography} from "./Typography";

const text =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias ea, voluptatum quasi eveniet quas ab mollitia illo sit illum, perspiciatis quam eius dolores tempore sapiente animi iste aliquam, ipsum modi.'

const meta = {
    component: Typography,
    tags: ['autodocs'],
    title: 'Components/UI/Typography',
    args: {text}
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>



export const Large: Story = {
    args: {
        variant: 'large',
    },
}


export const H1: Story = {
    args: {
        variant: 'h1',
    },
}

export const H2: Story = {
    args: {
        variant: 'h2',
    },
}

export const H3: Story = {
    args: {
        variant: 'h3',
    },
}

export const Regular_16: Story = {
    args: {
        variant: 'regular_16',
    },
}

export const Regular_14: Story = {
    args: {
        variant: 'regular_14',
    },
}

export const Bold_16: Story = {
    args: {
        variant: 'bold_16',
    },
}

export const Bold_14: Story = {
    args: {
        variant: 'bold_14',
    },
}

export const Medium_14: Story = {
    args: {
        variant: 'medium_14',
    },
}

export const Small: Story = {
    args: {
        variant: 'small',
    },
}

export const Semi_bold_small: Story = {
    args: {
        variant: 'semi_bold_small',
    },
}

export const Regular_link: Story = {
    args: {
        variant: 'regular_link',
        href: '#'
    },
}

export const Small_link: Story = {
    args: {
        variant: 'small_link',
        href: '#'
    },
}


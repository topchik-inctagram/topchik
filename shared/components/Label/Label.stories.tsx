import {Label} from "./";
import type {Meta, StoryObj} from "@storybook/react";

const meta = {
    component: Label,
    tags: ['autodocs'],
    title: 'Components/UI/Label',
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>
export const LabelStory: Story = {}
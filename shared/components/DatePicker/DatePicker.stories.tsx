import type {Meta, StoryObj} from "@storybook/react";
import {DatePicker} from "@/shared/components";

const meta: Meta<typeof DatePicker> = {
    title: 'Components/DatePicker', // Название вашего компонента в Storybook
    component: DatePicker,
    tags: ['autodocs'], // Автоматическая документация

};

export default meta;

// Тип для Story
type Story = StoryObj<typeof DatePicker>;

// Primary Button
export const DatePickerS: Story = {}
import type {Meta, StoryObj} from "@storybook/react";
import {Popover, PopoverContent, PopoverTrigger} from "./"
import {CalendarOutline} from "@/public";


const meta: Meta<typeof Popover> = {
    title: 'Components/Popover', // Название вашего компонента в Storybook
    component: Popover,
    tags: ['autodocs'], // Автоматическая документация

};

export default meta;

// Тип для Story
type Story = StoryObj<typeof Popover>;

// Primary Button
export const PopoverStory: Story = {
        render: () => {
            return (
                <Popover>
                    <PopoverTrigger>Select date <CalendarOutline/></PopoverTrigger>
                    <PopoverContent>Place content for the popover here.</PopoverContent>
                </Popover>
            )
        }
    }
;
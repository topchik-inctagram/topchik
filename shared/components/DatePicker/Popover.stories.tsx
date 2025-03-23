import type {Meta, StoryObj} from "@storybook/react";
import {Popover, PopoverContent, PopoverTrigger} from "./"
import {CalendarOutline} from "@/public";
import {Label, Typography} from "@/shared/components";
import {useState} from "react";
import type {DateRange} from "react-day-picker";
import {Calendar} from "@/shared/components/DatePicker/Calendar";


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
                <div style={{display: "flex", flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Label>Date</Label>
                    <Popover>
                        <PopoverTrigger><Typography variant={'regular_16'} as={'span'}>Select date </Typography><CalendarOutline/></PopoverTrigger>
                        <PopoverContent>Place content for the popover here.</PopoverContent>
                    </Popover>
                </div>
            )
        }
    }

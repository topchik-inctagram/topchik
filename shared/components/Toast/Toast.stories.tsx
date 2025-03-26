import type { Meta, StoryObj } from '@storybook/react'
import {Button, Toast} from '@/shared/components'
import {toast as sonnerToast} from 'sonner';
import {useEffect} from "react";


const meta: Meta<typeof Toast> = {
  title: 'Components/ToastS',
  component: Toast,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Button>

export const ToastWithRender: Story = {
  render: () => {
    return <Button   onClick={() => {
      Toast({
        title: 'Error!',
        type: 'error',
        description: 'You have full control of styles and jsx, while still having the animations.',
        button: {
          onClick: () => sonnerToast.dismiss(),
          label: 'Close'
        },
      });
    }}>Render toast</Button>
  }}


export const ToastSuccessType: Story = {
  render: () => {
    useEffect(() => {
      Toast({
        type: 'success',
        description: 'This is a test toast'
      });
    }, []);
return <></>
  }}


export const ToastErrorType: Story = {
  render: () => {
    useEffect(() => {
      Toast({
        type: 'error',
        description: 'This is a test toast'
      });
    }, []);
    return <></>
  }}

export const ToastErrType: Story = {
  render: () => {
    return <button
        className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white"
        onClick={() => {
          Toast({
            title: 'This is a headless toast',
            type: 'error',
            description: 'You have full control of styles and jsx, while still having the animations.',
            button: {
              label: 'Reply',
              onClick: () => sonnerToast.dismiss(),
            },
          });
        }}
    >
      Render toast
    </button>
  }
}


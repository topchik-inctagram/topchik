import type { Meta, StoryObj } from '@storybook/react'
import { Header } from './Header'

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Header>

export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
    selectedLanguage: 'english',
    notificationCount: 3,
    onLanguageChange: (lang: string) => {
      console.log(`Lang: ${lang}`)
    },
    onBellClick: () => {
      console.log('Bell clicked')
    },
  },
}

export const LoggedOut: Story = {
  args: {
    isLoggedIn: false,
    selectedLanguage: 'russian',
    onLanguageChange: (lang: string) => {
      console.log(`Lang: ${lang}`)
    },
    onSignUp: () => {
      console.log('Sign up')
    },
    onLogin: () => {
      console.log('Log in')
    },
  },
}

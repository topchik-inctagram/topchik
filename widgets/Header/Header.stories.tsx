import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Header } from './Header'

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Header>

const LoggedInTemplate = () => {
  const [language, setLanguage] = useState<'EN' | 'RU'>('EN')

  return (
    <Header
      isLoggedIn
      notificationCount={3}
      selectedLanguage={language}
      onLanguageChange={lang => {
        console.log(`Lang changed to: ${lang}`)
        setLanguage(lang as 'EN' | 'RU')
      }}
    />
  )
}

const LoggedOutTemplate = () => {
  const [language, setLanguage] = useState<'EN' | 'RU'>('RU')

  return (
    <Header
      isLoggedIn={false}
      selectedLanguage={language}
      onLanguageChange={lang => {
        console.log(`Lang changed to: ${lang}`)
        setLanguage(lang as 'EN' | 'RU')
      }}
    />
  )
}

export const LoggedIn: Story = {
  render: () => <LoggedInTemplate />,
}

export const LoggedOut: Story = {
  render: () => <LoggedOutTemplate />,
}

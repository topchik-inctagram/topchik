import type { Meta, StoryObj } from '@storybook/react'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from './Tabs'

const meta: Meta<typeof TabsRoot> = {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: '#0d0d0d' },
  },
}

export default meta

type Story = StoryObj<typeof TabsRoot>

export const DefaultVariant: Story = {
  render: () => (
    <TabsRoot defaultValue="general">
      <TabsList>
        <TabsTrigger value="general">General information</TabsTrigger>
        <TabsTrigger value="devices">Devices</TabsTrigger>
        <TabsTrigger value="account">Account Management</TabsTrigger>
        <TabsTrigger value="payments">My payments</TabsTrigger>
      </TabsList>
      <TabsContent style={{ marginTop: '12px' }} value="general">
        General content
      </TabsContent>
      <TabsContent style={{ marginTop: '12px' }} value="devices">
        Devices content
      </TabsContent>
      <TabsContent style={{ marginTop: '12px' }} value="account">
        Account
      </TabsContent>
      <TabsContent aria-disabled style={{ marginTop: '12px' }} value="payments">
        Payment info goes here
      </TabsContent>
    </TabsRoot>
  ),
}

export const DisabledVariant: Story = {
  render: () => (
    <TabsRoot defaultValue="general">
      <TabsList>
        <TabsTrigger value="general" disabled>
          General information
        </TabsTrigger>
        <TabsTrigger value="devices" disabled>
          Devices
        </TabsTrigger>
        <TabsTrigger value="account" disabled>
          Account Management
        </TabsTrigger>
        <TabsTrigger value="payments" disabled>
          My payments
        </TabsTrigger>
      </TabsList>
      <TabsContent style={{ marginTop: '12px', opacity: '0.6' }} value="general">
        General content
      </TabsContent>
      <TabsContent style={{ marginTop: '12px', opacity: '0.6' }} value="devices">
        Devices content
      </TabsContent>
      <TabsContent style={{ marginTop: '12px', opacity: '0.6' }} value="account">
        Account
      </TabsContent>
      <TabsContent style={{ marginTop: '12px', opacity: '0.6' }} value="payments">
        Payment info goes here
      </TabsContent>
    </TabsRoot>
  ),
}

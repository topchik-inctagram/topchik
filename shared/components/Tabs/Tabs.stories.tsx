import type { Meta, StoryObj } from '@storybook/react'
import { Tab, Tabs, TabsContent, TabsList } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark' },
    pseudo: {
      hover: ['[data-state=inactive]:hover'],
      focus: ['[data-state=inactive]:focus'],
    },
  },
}

export default meta

type Story = StoryObj<typeof Tabs>

export const DefaultVariant: Story = {
  render: () => (
    <Tabs defaultValue="active">
      <TabsList>
        <Tab value="default">Default</Tab>
        <Tab value="active">Active</Tab>
        <Tab value="hover">Hover</Tab>
        <Tab value="focus">Focus</Tab>
        <Tab disabled value="disabled">
          Disabled
        </Tab>
      </TabsList>
      <TabsContent value="default">Default content</TabsContent>
      <TabsContent value="active">Active content</TabsContent>
      <TabsContent value="hover">Hover content</TabsContent>
      <TabsContent value="focus">Focus content</TabsContent>
      <TabsContent value="disabled">Disabled content</TabsContent>
    </Tabs>
  ),
}

export const OutlineVariant: Story = {
  render: () => (
    <Tabs defaultValue="active">
      <TabsList variant="outline">
        <Tab value="default" variant="outline">
          Default
        </Tab>
        <Tab value="active" variant="outline">
          Active
        </Tab>
        <Tab value="hover" variant="outline">
          Hover
        </Tab>
        <Tab value="focus" variant="outline">
          Focus
        </Tab>
        <Tab disabled value="disabled" variant="outline">
          Disabled
        </Tab>
      </TabsList>
      <TabsContent value="default">Default content</TabsContent>
      <TabsContent value="active">Active content</TabsContent>
      <TabsContent value="hover">Hover content</TabsContent>
      <TabsContent value="focus">Focus content</TabsContent>
      <TabsContent value="disabled">Disabled content</TabsContent>
    </Tabs>
  ),
}
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Pagination } from './Pagination'

const meta = {
  title: 'Components/UI/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: 'var(--color-dark-700)',
        },
      ],
    },
  },
  argTypes: {
    count: {
      control: { type: 'number', min: 1 },
      description: 'Total number of pages',
    },
    page: {
      control: { type: 'number', min: 1 },
      description: 'Current active page',
    },
    onValuePageChange: {
      action: 'page changed',
      description: 'Callback when page is changed',
    },
    siblings: {
      control: { type: 'number', min: 1, max: 3 },
      description: 'Number of sibling pages to show around current page',
    },
  },
} satisfies Meta<typeof Pagination>

export default meta

type PaginationStory = StoryObj<typeof meta>

const Template: PaginationStory = {
  render: args => <Pagination {...args} />,
  args: {
    count: 10,
    page: 1,
    siblings: 1,
    onValuePageChange: page => console.log('Page changed to:', page),
  },
}

export const Basic: PaginationStory = {
  ...Template,
}

export const HoverState: PaginationStory = {
  ...Template,
  args: {
    ...Template.args,
    page: 3,
  },
  parameters: {
    pseudo: {
      hover: ['.item:not(.selected):not(:disabled)'],
    },
  },
}

export const InteractiveExample: PaginationStory = {
  render: args => {
    const [currentPage, setCurrentPage] = useState(1)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Pagination {...args} count={15} page={currentPage} onValuePageChange={setCurrentPage} />
        <div style={{ color: 'var(--color-light-100)', textAlign: 'center' }}>
          Current page: {currentPage}
        </div>
      </div>
    )
  },
  args: {
    ...Template.args,
    count: 15,
  },
}

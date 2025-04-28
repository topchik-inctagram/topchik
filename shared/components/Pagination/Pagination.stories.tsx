import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from '@/shared/components'
import { useState } from 'react'

const meta = {
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1)

    return (
      <Pagination
        currentPage={currentPage}
        pageSize={1}
        totalCount={100}
        onPageChange={page => setCurrentPage(page)}
      />
    )
  },
}

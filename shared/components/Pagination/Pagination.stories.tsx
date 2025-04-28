import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from '@/shared/components'
import { useState } from 'react'

const meta = {
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof Pagination>

export const PaginationWithSelect: Story = {
  render: Render,
}

function Render() {
  const pageSizeOptions = [5, 7, 10, 15, 20]
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(pageSizeOptions[0])
  return (
    <Pagination
      currentPage={currentPage}
      pageSize={pageSize}
      selectOptions={pageSizeOptions}
      totalCount={100}
      onPageChange={page => setCurrentPage(page)}
      onPageSizeChange={setPageSize}
    />
  )
}

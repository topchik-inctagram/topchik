import type { Meta, StoryObj } from '@storybook/react'
import { Card, ScrollArea } from '@/shared/components'
import type { CSSProperties } from 'react'

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea>

export default meta

type Story = StoryObj<typeof ScrollArea>

export const ScrollAreaWithXAndYAxis: Story = {
  render: () => {
    return <ScrollAreaWrapper />
  },
}
export const ScrollAreaWithXAxis: Story = {
  render: () => {
    return <ScrollAreaWrapper length={10} wrapText="wrap" />
  },
}

export const ScrollAreaWithYAxis: Story = {
  render: () => {
    return <ScrollAreaWrapper length={2} />
  },
}

function ScrollAreaWrapper({
  length = 20,
  wrapText = 'nowrap',
}: {
  length?: number
  wrapText?: CSSProperties['textWrap']
}) {
  const TAGS = Array.from({ length }).map(
    (_, i, a) =>
      `v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-betav1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.${
        a.length - i
      }`
  )
  return (
    <Card
      style={{
        height: 600,
        width: 600,
        textWrap: wrapText,
      }}
    >
      <ScrollArea>
        {TAGS.map(tag => (
          <div
            key={tag}
            style={{ fontSize: 13, lineHeight: 18, marginTop: 10, borderTop: 1, paddingTop: 10 }}
          >
            {tag}
          </div>
        ))}
      </ScrollArea>
    </Card>
  )
}

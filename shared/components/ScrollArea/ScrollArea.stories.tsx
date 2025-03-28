import type { Meta, StoryObj } from '@storybook/react'
import { Card, ScrollArea } from '@/shared/components'

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea>

export default meta

type Story = StoryObj<typeof ScrollArea>

// Primary Button
export const ScrollAreaSt: Story = {
  render: () => {
    const TAGS = Array.from({ length: 20 }).map(
      (_, i, a) =>
        `v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-betav1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.v1.2.0-beta.${a.length - i}`
    )
    return (
      <ScrollArea>
        <Card
          style={{
            height: 600,
            width: 600,
            overflowY: 'scroll',
            overflowX: 'scroll',
            textWrap: 'nowrap',
          }}
        >
          {TAGS.map(tag => (
            <div
              key={tag}
              style={{ fontSize: 13, lineHeight: 18, marginTop: 10, borderTop: 1, paddingTop: 10 }}
            >
              {tag}
            </div>
          ))}
        </Card>
      </ScrollArea>
    )
  },
}

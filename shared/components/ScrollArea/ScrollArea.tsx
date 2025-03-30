import s from './ScrollArea.module.scss'
import {
  ScrollAreaThumb,
  ScrollAreaScrollbar,
  ScrollAreaViewport,
  Root,
  ScrollAreaCorner,
  type ScrollAreaProps,
} from '@radix-ui/react-scroll-area'
import { clsx } from 'clsx'

export const ScrollArea = (props: ScrollAreaProps) => {
  const { children, className, ...rest } = props

  const classNames = {
    root: clsx(s.root, className),
    viewPort: s.viewPort,
    scrollBar: s.scrollBar,
    areaThumb: s.areaThumb,
    corner: s.corner,
  }

  return (
    <Root className={classNames.root} {...rest}>
      <ScrollAreaViewport className={classNames.viewPort}>{children}</ScrollAreaViewport>
      <ScrollAreaScrollbar className={classNames.scrollBar} orientation="vertical">
        <ScrollAreaThumb className={classNames.areaThumb} />
      </ScrollAreaScrollbar>
      <ScrollAreaScrollbar className={classNames.scrollBar} orientation="horizontal">
        <ScrollAreaThumb className={classNames.areaThumb} />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner className={classNames.corner} />
    </Root>
  )
}

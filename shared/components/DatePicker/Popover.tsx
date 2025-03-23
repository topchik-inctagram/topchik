import * as PopoverPrimitive from '@radix-ui/react-popover'
import type {ComponentPropsWithRef} from "react";
import s from './Popover.module.scss'
type Props = ComponentPropsWithRef<typeof PopoverPrimitive.Content>

const Popover = PopoverPrimitive.Root

type PopoverTriggerProps = ComponentPropsWithRef<typeof PopoverPrimitive.Trigger>

const PopoverTrigger = (props: PopoverTriggerProps) => {
    return (
        <PopoverPrimitive.Trigger {...props} className={s.trigger}/>
    )
}

const PopoverContent = (props: Props) => {
    return (
        <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content {...props}/>
        </PopoverPrimitive.Portal>
    )
}

PopoverContent.displayName = PopoverPrimitive.Content.displayName

export {Popover, PopoverTrigger, PopoverContent}
import * as PopoverPrimitive from "@radix-ui/react-popover"
import type {ComponentPropsWithRef} from "react";

type Props = ComponentPropsWithRef<typeof PopoverPrimitive.Content>

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = (props: Props) => {
    return (
        <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content {...props}/>
        </PopoverPrimitive.Portal>
    )
}

PopoverContent.displayName = PopoverPrimitive.Content.displayName

export {Popover, PopoverTrigger, PopoverContent}
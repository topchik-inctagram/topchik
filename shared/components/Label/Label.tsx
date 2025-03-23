import {type ComponentPropsWithRef} from "react";
import * as LabelRadix from '@radix-ui/react-label'
import s from './Label.module.scss'

import clsx from "clsx";
import {Typography} from "@/shared/components";

type Props = ComponentPropsWithRef<typeof LabelRadix.Root>

export const Label = (props: Props) => {
    const {children, className, ref, ...rest} = props

    const classNames = {
        label: clsx(s.label, className),
    }

    return (
        <LabelRadix.Root {...rest} asChild className={classNames.label} ref={ref}>
            <Typography as={'label'} variant={'regular_14'}>
                {children}
            </Typography>
        </LabelRadix.Root>
    )
}

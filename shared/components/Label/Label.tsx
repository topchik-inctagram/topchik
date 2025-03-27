import {type ComponentPropsWithRef} from "react";
import * as LabelRadix from '@radix-ui/react-label'
import s from './Label.module.scss'

import clsx from "clsx";
import { Typography } from "../Typography";


type Props = {disabled?: boolean} &ComponentPropsWithRef<typeof LabelRadix.Root>

export const Label = (props: Props) => {
    const {children, className, ref, disabled, ...rest} = props

    const classNames = {
        label: clsx(s.label, disabled && s.disabled, className),
    }

    return (
        <LabelRadix.Root {...rest} asChild className={classNames.label} ref={ref}>
            <Typography as={'label'} variant={'regular_14'}>
                {children}
            </Typography>
        </LabelRadix.Root>
    )
}

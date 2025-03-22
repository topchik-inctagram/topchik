import {ComponentPropsWithoutRef, ElementType, type RefObject} from 'react'

import s from './typography.module.scss'
import Link from 'next/link'
import clsx from "clsx";

type Props<T extends ElementType = 'p'> = {
    as?: T
    text?: string
    ref?: RefObject<T>
    variant?:
        | 'large'
        | 'h1'
        | 'h2'
        | 'h3'
        | 'regular_16'
        | 'bold_16'
        | 'regular_14'
        | 'medium_14'
        | 'bold_14'
        | 'small'
        | 'semi_bold_small'
        | 'regular_link'
        | 'small_link'
}

type TypographyProps<T extends ElementType> = Props<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>

export const Typography = <T extends ElementType = 'p'>(props: TypographyProps<T>) => {
    const {as, children, className, text = '', variant = 'regular_16', ref, ...rest} = props

    const classNames = {
        typography: clsx(s.typography, s[variant], className),
    }

    //todo move to utils
    function exhaustiveCheck(value: never) {
        return value
    }

    function typographyVar(as: ElementType = 'p', variant: Props<T>['variant'] = 'regular_16') {
        switch (variant) {
            case 'regular_16':
            case 'bold_16':
            case 'regular_14':
            case 'medium_14':
            case 'large':
            case 'small':
            case 'semi_bold_small':
            case 'bold_14':
                return as
            case 'h1':
                return 'h1'
            case 'h2':
                return 'h2'
            case 'h3':
                return 'h3'
            case 'regular_link':
            case 'small_link':
                return Link
            default:
                return exhaustiveCheck(variant)
        }
    }

    const Component = typographyVar(as, variant)

    return (
        <Component className={classNames.typography} ref={ref} {...rest}>
            {children ?? text}
        </Component>
    )
}

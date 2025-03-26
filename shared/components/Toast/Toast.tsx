import {Close} from "@/public";
import {Typography} from "@/shared/components";
import s from './Toast.module.scss'
import clsx from "clsx";
import {
    Toast as ToastRoot,
    ToastClose,
    ToastDescription,
    type ToastProps,
    ToastProvider,
    ToastTitle,
    ToastViewport
} from "@radix-ui/react-toast";

interface Props extends ToastProps {
    description: string;
    variant: 'error' | 'success'
}

export const Toast = (props: Props) => {
    const {title, description, variant, className, ...rest} = props
    const ERROR_TYPE = variant === 'error'
    const SUCCESS_TYPE = variant === 'success'
    const ERROR_TITLE = 'Error!'
    const defaultTitle = ERROR_TYPE && ERROR_TITLE
    const classNames = {
        toastRoot: clsx(s.toastRoot, ERROR_TYPE && s.error, SUCCESS_TYPE && s.success, className),
        closeButton: s.closeButton,
        textContainer: s.textContainer,
        viewPort: s.viewPort
    }

    return (
        <ToastProvider swipeDirection={'up'}>
            <ToastRoot duration={3000} type={'foreground'} className={classNames.toastRoot} {...rest} >
                <div className={s.textContainer}>{ERROR_TYPE && <ToastTitle asChild><Typography
                    variant={'bold_16'}>{title ?? defaultTitle}</Typography></ToastTitle>}
                    <ToastDescription asChild><Typography
                        variant={'regular_16'}>{description}</Typography></ToastDescription></div>
                <ToastClose aria-label="Close" className={s.closeButton}><span aria-hidden><Close/></span></ToastClose>
            </ToastRoot>
            <ToastViewport className={s.viewPort}/>
        </ToastProvider>
    )
}


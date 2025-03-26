import {toast as sonnerToast} from 'sonner';
import {Close} from "@/public";
import {Typography} from "@/shared/components";
import s from './Toast.module.scss'
import clsx from "clsx";


/** I recommend abstracting the toast function
 *  so that you can call it without having to use toast.custom everytime. */


type ToastProps = {
    id?: string | number;
    title?: string | null;
    description: string;
    type: 'error' | 'success'
    button?: {
        onClick: () => void;
        label: string
    };
}

export const Toast = (props: Omit<ToastProps, 'id'>) => {
    const {title, description, type, button} = props
    const ERROR_TYPE = type === 'error'
    const ERROR_TITLE = 'Error!'
    const BUTTON_LABEL = 'Close'
    const defaultTitle = ERROR_TYPE ? ERROR_TITLE : null

    return sonnerToast.custom((id) => {
        console.log('IT WORKDS')
        console.log(id)
        return <SonnerToast
            id={id}
            title={title ?? defaultTitle}
            type={type}
            description={description}
            button={{
                onClick: button?.onClick ?? (() => console.log('click')),
                label: button?.label ?? BUTTON_LABEL
            }}
        />
    });
}

/** A fully custom toast that still maintains the animations and interactions. */
export const SonnerToast = (props: ToastProps) => {
    const {title, description, button, type, id} = props;
    const ERROR_TYPE = type === 'error'
    const SUCCESS_TYPE = type === 'success'
    const classNames = {
        toastWrapper: clsx(s.toastWrapper, ERROR_TYPE && s.error, SUCCESS_TYPE && s.success)
    }

    return <div className={classNames.toastWrapper}>
            <div>
                {title && <Typography variant={'bold_16'}>{title}</Typography>}
                <Typography variant={'regular_16'}>{description}</Typography>
            </div>
        <div>
            <button
                onClick={() => {
                    button?.onClick()
                    sonnerToast.dismiss(id);
                }}
            >
                <Close/>
            </button>
        </div>
    </div>
}



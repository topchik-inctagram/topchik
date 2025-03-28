import { ComponentPropsWithRef, FC } from 'react'
import { clsx } from 'clsx'
import s from './Pagination.module.scss'
import { usePagination } from './usePagination'
import { ArrowIosBack, ArrowIosForward } from '@/public'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

type PaginationConditionals =
    | {
    onPerPageChange: (itemPerPage: number) => void
    perPage: number
    perPageOptions: number[]
}
    | {
    onPerPageChange?: never
    perPage?: null
    perPageOptions?: never
}

export type PaginationProps = {
    count: number
    onValuePageChange: (page: number) => void
    onPerPageChange?: (itemPerPage: number) => void
    page: number
    perPage?: number
    perPageOptions?: number[]
    siblings?: number
} & PaginationConditionals &
    Omit<ComponentPropsWithRef<'div'>, 'onChange'>

const classNames = {
    container: s.container,
    dots: s.dots,
    icon: s.icon,
    item: s.item,
    pageButton(selected?: boolean) {
        return clsx(this.item, selected && s.selected)
    },
    root(className?: string) {
        return clsx(s.root, className)
    },
    select: s.select,
    selectBox: s.selectBox,
}

export const Pagination: FC<PaginationProps> = ({
                                                    className,
                                                    count,
                                                    onValuePageChange,
                                                    onPerPageChange,
                                                    page,
                                                    perPage = null,
                                                    perPageOptions,
                                                    siblings,
                                                    ...rest
                                                }) => {
    const {
        handleMainPageClicked,
        handleNextPageClicked,
        handlePreviousPageClicked,
        isFirstPage,
        isLastPage,
        paginationRange,
    } = usePagination({
        count,
        onValuePageChange,
        page,
        siblings,
    })

    const showPerPageSelect = !!perPage && !!perPageOptions && !!onPerPageChange

    return (
        <div className={classNames.root(className)} {...rest}>
            <div className={classNames.container}>
                <PrevButton disabled={isFirstPage} onClick={handlePreviousPageClicked} />

                <MainPaginationButtons
                    currentPage={page}
                    onClick={handleMainPageClicked}
                    paginationRange={paginationRange}
                />

                <NextButton disabled={isLastPage} onClick={handleNextPageClicked} />
            </div>

            {showPerPageSelect && (
                <PerPageSelect
                    {...{
                        onPerPageChange,
                        perPage,
                        perPageOptions,
                    }}
                />
            )}
        </div>
    )
}

type NavigationButtonProps = {
    disabled?: boolean
    onClick: () => void
}

type PageButtonProps = NavigationButtonProps & {
    page: number
    selected: boolean
}

const Dots: FC = () => {
    return <span className={classNames.dots}>&#8230;</span>
}
const PageButton: FC<PageButtonProps> = ({ disabled, onClick, page, selected }) => {
    return (
        <button
            className={classNames.pageButton(selected)}
            disabled={selected || disabled}
            onClick={onClick}
        >
            {page}
        </button>
    )
}

const PrevButton: FC<NavigationButtonProps> = ({ disabled, onClick }) => {
    const searchParams = useSearchParams()
    const currentPage = searchParams.get('page') || '1'

    const prevPage = parseInt(currentPage) > 1 ? parseInt(currentPage) - 1 : 1
    const newSearchParams = new URLSearchParams(searchParams.toString())

    if (prevPage === 1) {
        newSearchParams.delete('page')
    } else {
        newSearchParams.set('page', prevPage.toString())
    }

    return (
        <Link
            href={`?${newSearchParams.toString()}`}
            onClick={onClick}
            aria-disabled={disabled}
            className={disabled ? classNames.item : undefined}
        >
            <button className={classNames.item} disabled={disabled}>
                <ArrowIosBack className={classNames.icon} />
            </button>
        </Link>
    )
}

const NextButton: FC<NavigationButtonProps> = ({ disabled, onClick }) => {
    const searchParams = useSearchParams()
    const currentPage = searchParams.get('page') || '1'

    const nextPage = parseInt(currentPage) + 1
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('page', nextPage.toString())

    return (
        <Link
            href={`?${newSearchParams.toString()}`}
            onClick={onClick}
            aria-disabled={disabled}
            className={disabled ? classNames.item : undefined}
        >
            <button className={classNames.item} disabled={disabled}>
                <ArrowIosForward className={classNames.icon} />
            </button>
        </Link>
    )
}

type MainPaginationButtonsProps = {
    currentPage: number
    onClick: (pageNumber: number) => () => void
    paginationRange: (number | string)[]
}
const MainPaginationButtons: FC<MainPaginationButtonsProps> = ({
                                                                   currentPage,
                                                                   onClick,
                                                                   paginationRange,
                                                               }) => {
    const searchParams = useSearchParams()

    return (
        <>
            {paginationRange.map((page: number | string, index) => {
                const isSelected = page === currentPage

                if (typeof page !== 'number') {
                    return <Dots key={index} />
                }

                const newSearchParams = new URLSearchParams(searchParams.toString())
                if (page === 1) {
                    newSearchParams.delete('page')
                } else {
                    newSearchParams.set('page', page.toString())
                }

                return (
                    <Link
                        key={index}
                        href={`?${newSearchParams.toString()}`}
                        onClick={onClick(page)}
                        scroll={false}
                        className={classNames.item}
                    >
                        <PageButton key={index} onClick={onClick(page)} page={page} selected={isSelected} />
                    </Link>
                )
            })}
        </>
    )
}

export type PerPageSelectProps = {
    onPerPageChange: (itemPerPage: number) => void
    perPage: number
    perPageOptions: number[]
}

export const PerPageSelect: FC<PerPageSelectProps> = (
    {
        // perPage,
        // perPageOptions,
        // onPerPageChange,
    }
) => {
    // const selectOptions = perPageOptions.map(value => ({
    //   label: value,
    //   value,
    // }))

    return (
        <div className={classNames.selectBox}>
            Показать
            {/*<Select*/}
            {/*  className={classNames.select}*/}
            {/*  value={perPage}*/}
            {/*  options={selectOptions}*/}
            {/*  onChange={onPerPageChange}*/}
            {/*  variant="pagination"*/}
            {/*/>*/}
            на странице
        </div>
    )
}

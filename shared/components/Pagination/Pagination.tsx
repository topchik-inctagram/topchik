'use client'

import { clsx } from 'clsx'
import s from './Pagination.module.scss'
import { ArrowIosBack, ArrowIosForward } from '@/public/icons'
import Link from 'next/link'
import { type MouseEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { DOTS, usePagination } from '@/shared/components/Pagination'
// original code
// https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
type Props = {
  className?: string
  totalCount: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (itemPerPage: number) => void
  currentPage: number
  pageSize: number
  selectOptions?: number[]
  siblingCount?: number
}

export const Pagination = ({
  className,
  totalCount,
  onPageChange,
  onPageSizeChange,
  currentPage,
  pageSize,
  selectOptions,
  siblingCount = 1,
}: Props) => {
  const classNames = {
    container: s.container,
    root: clsx(s.root, className),
  }

  const paginationRange = usePagination({
    totalCount,
    pageSize,
    currentPage,
    siblingCount,
  })
  if (!paginationRange || (paginationRange && paginationRange.length < 2)) {
    return null
  }

  const isLastPage = paginationRange?.at(-1) === currentPage
  const isFirstPage = currentPage === 1
  const prevButtonHandler = () => {
    onPageChange(currentPage - 1)
  }
  const nextButtonHandler = () => {
    onPageChange(currentPage + 1)
  }
  const mainButtonHandler = (pageNumber: number) => {
    onPageChange(pageNumber)
  }
  const showPerPageSelect = !!pageSize && !!selectOptions && !!onPageSizeChange

  return (
    <div className={classNames.root}>
      <div className={classNames.container}>
        <PrevLink disabled={isFirstPage} onClick={prevButtonHandler} />
        <MainLinks
          currentPage={currentPage}
          paginationRange={paginationRange}
          onClick={mainButtonHandler}
        />
        <NextLink disabled={isLastPage} onClick={nextButtonHandler} />
      </div>

      {/*{showPerPageSelect && (*/}
      {/*  <PerPageSelect*/}
      {/*    {...{*/}
      {/*      onPageSizeChange,*/}
      {/*      pageSize,*/}
      {/*      selectOptions,*/}
      {/*    }}*/}
      {/*  />*/}
      {/*)}*/}
    </div>
  )
}

type NavigationLink = {
  disabled?: boolean
  onClick: () => void
}

const Dots = () => {
  return <span className={s.dots}>&#8230;</span>
}

const PrevLink = ({ disabled, onClick }: NavigationLink) => {
  const classNames = {
    item: s.item,
  }
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
      aria-disabled={disabled}
      className={classNames.item}
      data-disabled={disabled || undefined}
      href={`?${newSearchParams.toString()}`}
      tabIndex={0}
      onClick={onClick}
    >
      <ArrowIosBack />
    </Link>
  )
}

const NextLink = ({ disabled, onClick }: NavigationLink) => {
  const classNames = {
    item: s.item,
  }
  const searchParams = useSearchParams()
  const currentPage = searchParams.get('page') || '1'

  const nextPage = parseInt(currentPage) + 1
  const newSearchParams = new URLSearchParams(searchParams.toString())
  newSearchParams.set('page', nextPage.toString())

  return (
    <Link
      aria-disabled={disabled}
      className={classNames.item}
      data-disabled={disabled || undefined}
      href={`?${newSearchParams.toString()}`}
      tabIndex={0}
      onClick={onClick}
    >
      <ArrowIosForward />
    </Link>
  )
}

type MainPaginationButtons = {
  currentPage: number
  onClick: (pageNumber: number) => void
  paginationRange: (number | string)[]
}

const MainLinks = ({ currentPage, onClick, paginationRange }: MainPaginationButtons) => {
  const classNames = {
    item: s.item,
    pageButton(selected: boolean) {
      return clsx(selected && s.selected)
    },
  }
  const searchParams = useSearchParams()

  return (
    <>
      {paginationRange.map((page: number | string, index) => {
        const isSelected = page === currentPage

        if (page === DOTS) {
          return <Dots key={index} />
        }

        const newSearchParams = new URLSearchParams(searchParams.toString())
        if (+page === 1) {
          newSearchParams.delete('page')
        } else {
          newSearchParams.set('page', page.toString())
        }

        return (
          <Link
            key={index}
            className={clsx(classNames.item, {
              [classNames.pageButton(true)]: isSelected,
              disabled: isSelected,
            })}
            href={`?${newSearchParams.toString()}`}
            scroll={false}
            tabIndex={0}
            onClick={(e: MouseEvent) => {
              if (isSelected) {
                e.preventDefault()
                return
              }
              onClick(+page)
            }}
          >
            {page}
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

export const PerPageSelect = ({ perPage, perPageOptions, onPerPageChange }: PerPageSelectProps) => {
  const classNames = {
    select: s.select,
    selectBox: s.selectBox,
  }
  const selectOptions = perPageOptions.map(value => ({
    label: value,
    value,
  }))

  return (
    <div className={classNames.selectBox}>
      Показать
      {/*<Select*/}
      {/*  className={classNames.select}*/}
      {/*  options={selectOptions}*/}
      {/*  value={perPage}*/}
      {/*  variant="pagination"*/}
      {/*  onChange={onPerPageChange}*/}
      {/*/>*/}
      на странице
    </div>
  )
}

import { type ComponentPropsWithRef } from 'react'
import clsx from 'clsx'
import s from './Table.module.scss'

/* ========== PROP TYPES ========== */

type TableRootProps = ComponentPropsWithRef<'table'>
type TableHeadProps = ComponentPropsWithRef<'thead'>
type TableBodyProps = ComponentPropsWithRef<'tbody'>
type TableRowProps = ComponentPropsWithRef<'tr'>
type TableCellProps = ComponentPropsWithRef<'td'>
type TableEmptyProps = ComponentPropsWithRef<'span'>
type TableHeaderCellProps = {
  isSorting?: boolean
} & ComponentPropsWithRef<'th'>

/* ========== CLASSNAMES OBJECT ========== */

const classNames = {
  root: (className?: string) => clsx(s.root, className),
  head: (className?: string) => clsx(s.head, className),
  body: (className?: string) => clsx(s.body, className),
  row: (className?: string) => clsx(s.row, className),
  headerCell: (isSorting?: boolean, className?: string) =>
    clsx(s.headerCell, isSorting && s.headerCellSorting, className),
  cell: (className?: string) => clsx(s.cell, className),
  empty: (className?: string) => clsx(s.empty, className),
}

/* ========== COMPONENTS ========== */

const Root = ({ className, ...rest }: TableRootProps) => {
  return <table className={classNames.root(className)} {...rest} />
}

const Head = ({ className, ...rest }: TableHeadProps) => {
  return <thead className={classNames.head(className)} {...rest} />
}

const Body = ({ className, ...rest }: TableBodyProps) => {
  return <tbody className={classNames.body(className)} {...rest} />
}

const Row = ({ className, ...rest }: TableRowProps) => {
  return <tr className={classNames.row(className)} {...rest} />
}

const HeaderCell = ({ className, isSorting = false, ...rest }: TableHeaderCellProps) => {
  return <th className={classNames.headerCell(isSorting, className)} {...rest} />
}

const Cell = ({ className, ...rest }: TableCellProps) => {
  return <td className={classNames.cell(className)} {...rest} />
}

const Empty = ({ className, ...rest }: TableEmptyProps) => {
  return <span className={classNames.empty(className)} {...rest} />
}

/* ========== EXPORT ========== */

export const Table = {
  Root,
  Head,
  Body,
  Row,
  HeaderCell,
  Cell,
  Empty,
}

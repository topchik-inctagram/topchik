import { type ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'
import s from './Table.module.scss'

const Root = ({ className, ...restProps }: ComponentPropsWithoutRef<'table'>) => (
  <table className={clsx(s.root, className)} {...restProps} />
)

const Head = ({ className, ...restProps }: ComponentPropsWithoutRef<'thead'>) => (
  <thead className={clsx(s.head, className)} {...restProps} />
)

const Body = ({ className, ...restProps }: ComponentPropsWithoutRef<'tbody'>) => (
  <tbody className={clsx(s.body, className)} {...restProps} />
)

const Row = ({ className, ...restProps }: ComponentPropsWithoutRef<'tr'>) => (
  <tr className={clsx(s.row, className)} {...restProps} />
)

const HeaderCell = ({
  className,
  isSorting = false,
  ...restProps
}: ComponentPropsWithoutRef<'th'> & { isSorting?: boolean }) => (
  <th className={clsx(s.headerCell, isSorting && s.headerCellSorting, className)} {...restProps} />
)

const Cell = ({ className, ...restProps }: ComponentPropsWithoutRef<'td'>) => (
  <td className={clsx(s.cell, className)} {...restProps} />
)

const Empty = ({ className, ...restProps }: ComponentPropsWithoutRef<'span'>) => (
  <span className={clsx(s.empty, className)} {...restProps} />
)

export const Table = {
  Root,
  Head,
  Body,
  Row,
  HeaderCell,
  Cell,
  Empty,
}

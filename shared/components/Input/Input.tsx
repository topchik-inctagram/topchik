'use client'

import {
  type ChangeEvent,
  type ComponentPropsWithRef,
  type KeyboardEvent,
  useEffect,
  useId,
  useState,
} from 'react'

import clsx from 'clsx'
import s from './Input.module.scss'
import { Close, EyeOffOutline, EyeOutline, Search } from '@/public/icons'
import { Label, Typography } from '@/shared/components'

export type InputProps = {
  label?: string
  error?: string
  onChangeValue?: (value: string) => void
  onKeyEnter?: () => void
  onClear?: () => void
} & ComponentPropsWithRef<'input'>

export const Input = ({
  label,
  id,
  error,
  className,
  type,
  disabled,
  onChange,
  onChangeValue,
  onKeyEnter,
  onClear,
  onKeyDown,
  value,
  ref,
  ...rest
}: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const isPasswordType = type === 'password'
  const inputType = isPasswordType ? (showPassword ? 'text' : 'password') : type
  const isSearchType = type === 'search'

  const generateId = useId()

  const finalId = id ?? generateId

  const classNames = {
    inputRoot: clsx(s.inputRoot, className, disabled && s.disabled),
    label: s.label,
    inputContainer: s.inputContainer,
    input: clsx(
      s.inputDefault,
      isSearchType && s.inputWithSearchIcon,
      error && s.error,
      isPasswordType && s.inputWithEyeIcon
    ),
    searchIcon: s.searchIcon,
    showPassword: s.showPassword,
    clearIcon: s.clearIcon,
    errorText: s.errorText,
  }
  const inputEl = document.getElementById(finalId)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
    inputEl?.focus()
  }

  useEffect(() => {
    if (type === 'password' && value === '') {
      setShowPassword(false)
    }
  }, [value])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onChangeValue?.(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onKeyEnter && e.key === 'Enter') {
      onKeyEnter()
    }
    onKeyDown?.(e)
  }

  return (
    <div className={classNames.inputRoot}>
      {label && (
        <Label className={classNames.label} htmlFor={finalId}>
          {label}
        </Label>
      )}
      <div className={classNames.inputContainer}>
        {isSearchType && (
          <button
            className={classNames.searchIcon}
            disabled={disabled}
            type="button"
            onClick={onKeyEnter}
          >
            <Search />
          </button>
        )}
        <input
          ref={ref}
          className={classNames.input}
          disabled={disabled}
          id={finalId}
          type={inputType}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          {...rest}
        />
        {isSearchType && !!value && (
          <button
            className={classNames.clearIcon}
            disabled={disabled}
            type="button"
            onClick={onClear}
          >
            <Close />
          </button>
        )}
        {isPasswordType && (
          <button
            className={classNames.showPassword}
            disabled={disabled}
            type="button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOutline /> : <EyeOffOutline />}
          </button>
        )}
      </div>
      {error && (
        <Typography className={classNames.errorText} variant="small">
          {error}
        </Typography>
      )}
    </div>
  )
}

'use client'

import { ChangeEvent, KeyboardEvent, ComponentPropsWithRef, useId, useState } from 'react'

import clsx from 'clsx'
import s from './Input.module.scss'
import { Close, EyeOffOutline, EyeOutline, Search } from '@/public'
import { Label, Typography } from '@/shared/components'

type InputProps = {
  label?: string
  error?: string
  onEnterPress?: (e: KeyboardEvent<HTMLInputElement>) => void
  onChangeValue?: (value: string) => void
  onSearchClick?: () => void
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
  onEnterPress,
  onSearchClick,
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onChangeValue?.(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onEnterPress && e.key === 'Enter') {
      onEnterPress(e)
    }
    onKeyDown?.(e)
  }

  return (
    <div className={classNames.inputRoot}>
      {label && (
        <Label className={classNames.label} htmlFor={id}>
          {label}
        </Label>
      )}
      <div className={classNames.inputContainer}>
        {isSearchType && (
          <button disabled={disabled} className={classNames.searchIcon} onClick={onSearchClick}>
            <Search />
          </button>
        )}
        <input
          id={id || generateId}
          className={classNames.input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={ref}
          value={value}
          type={inputType}
          disabled={disabled}
          {...rest}
        />
        {isSearchType && !!value && (
          <button
            type="button"
            onClick={onClear}
            className={classNames.clearIcon}
            disabled={disabled}
          >
            <Close />
          </button>
        )}
        {isPasswordType && (
          <button
            disabled={disabled}
            className={classNames.showPassword}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOutline /> : <EyeOffOutline />}
          </button>
        )}
      </div>
      {error && (
        <Typography as="span" className={classNames.errorText} variant="small">
          {error}
        </Typography>
      )}
    </div>
  )
}

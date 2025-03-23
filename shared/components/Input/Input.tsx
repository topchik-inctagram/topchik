'use client'

import { ComponentPropsWithoutRef, forwardRef, useState } from 'react'
import { Label } from '../Label'
import clsx from 'clsx'
import s from './Input.module.scss'
import { Eye, EyeOff, Search } from '@/public'

type InputProps = {
  label?: string
  error?: string
  icon?: React.ReactNode
  fullWidth?: boolean
  className?: string
  search?: boolean
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, fullWidth, className, search, type, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const isPasswordType = type === 'password'
    const inputType = isPasswordType ? (showPassword ? 'text' : 'password') : type

    const classNames = {
      inputRoot: clsx(s.inputRoot, fullWidth && s.fullWidth, className),
      input: clsx(s.inputDefault, search && s.searchIcon, error && s.error),
    }

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }
    return (
      <div className={classNames.inputRoot}>
        <Label>{label}</Label>
        <div className={s.inputContainer}>
          {search && <Search className={s.searchIcon} />}
          <input
            className={classNames.input}
            placeholder={rest.placeholder}
            ref={ref}
            type={inputType}
            disabled={rest.disabled}
            {...rest}
          />
          {isPasswordType && (
            <button className={s.showPassword} onClick={togglePasswordVisibility}>
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
        {error && <span className={s.errorText}>{error}</span>}
      </div>
    )
  }
)

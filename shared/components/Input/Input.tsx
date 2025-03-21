import { ComponentPropsWithoutRef } from 'react'

type InputProps = {
  label?: string
  error?: string
  icon?: React.ReactNode
  fullWidth?: boolean
} & ComponentPropsWithoutRef<'input'>

export const Input = ({ label, error, icon, fullWidth, ...rest }: InputProps) => {
  return <input />
}

'use client'

import { Checkbox, type CheckboxProps } from '@/shared/components'
import { type FieldValues, useController, type UseControllerProps } from 'react-hook-form'

type Props<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'defaultValue' | 'disabled' | 'rules'
> &
  Omit<CheckboxProps, 'checked' | 'onCheckedChange'>

export const ControlledCheckbox = <T extends FieldValues>(props: Props<T>) => {
  const { control, shouldUnregister, name, disabled, ...rest } = props

  const {
    field: { onChange, value, ...field },
  } = useController({
    control,
    disabled,
    name,
    shouldUnregister,
  })

  return <Checkbox {...{ ...rest, ...field, checked: value, onCheckedChange: onChange }} />
}

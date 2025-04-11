import { type ComponentPropsWithRef, useId, useState } from 'react';
import * as CheckboxRadix from '@radix-ui/react-checkbox';
import s from './Checkbox.module.scss';
import { clsx } from 'clsx';
import { Vector } from '@/public';
import { Label } from '@/shared/components';

export type CheckboxProps = {
  label?: string;
} & ComponentPropsWithRef<typeof CheckboxRadix.Root>;

export const Checkbox = ({
  disabled,
  id,
  label,
  className,
  checked,
  onCheckedChange,
  ...rest
}: CheckboxProps) => {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  const classNames = {
    container: clsx(s.container, className),
    root: clsx(s.root, disabled && s.disabled),
    indicator: s.indicator,
    label: clsx(s.label, disabled && s.disabled),
  };

  return (
    <div className={classNames.container}>
      <CheckboxRadix.Root
        {...rest}
        id={checkboxId}
        className={classNames.root}
        disabled={disabled}
        checked={checked}
        onCheckedChange={onCheckedChange}
      >
        <CheckboxRadix.Indicator className={classNames.indicator}>
        {checked && <Vector />}
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>

      {label && (
        <Label className={classNames.label} htmlFor={checkboxId}>
          {label}
        </Label>
      )}
    </div>
  );
};

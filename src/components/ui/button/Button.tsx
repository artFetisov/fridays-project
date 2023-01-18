import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

import cn from 'classnames'

import styles from './Button.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type ButtonPropsType = DefaultButtonPropsType & {
  big?: boolean
  variant?: 'white' | 'blue' | 'no-radius' | 'red'
}

export const Button: FC<ButtonPropsType> = ({
  big,
  className,
  variant,
  disabled,
  ...restProps
}) => {
  return (
    <button
      className={cn(styles.default, {
        [styles.big]: big,
        [styles.white]: variant === 'white',
        [styles.red]: variant === 'red',
        [styles.noRadius]: variant === 'no-radius',
        [styles.disabled]: disabled,
      })}
      {...restProps}
    />
  )
}

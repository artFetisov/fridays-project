import React, {ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes, KeyboardEvent} from 'react'
import styles from './Input.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    sizeInp?: string
}

export const Input: FC<SuperInputTextPropsType> = (
    {
        type,
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,
        sizeInp,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter && e.key === 'Enter' && onEnter()
    }

    const finalSpanClassName = `${styles.error} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${styles.superInput} 
    ${sizeInp === 'small' && styles.small} 
    ${className ? className : ''} 
    ${error && styles.errorInput}`

    return <>
        <input
            type={'text'}
            onChange={onChangeCallback}
            onKeyPress={onKeyPressCallback}
            className={finalInputClassName}
            {...restProps}
        />
        {error && <span className={finalSpanClassName}>{error}</span>}
    </>
}


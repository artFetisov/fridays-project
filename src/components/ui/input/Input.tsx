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
        placeholder,
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

    return <div className={styles.common}>
        <label>
            <span>{placeholder}</span>
            <input
                type={'text'}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                {...restProps}
                className={styles.input}
            />
            {error && <span className={finalSpanClassName}>{error}</span>}
        </label>
        {/*{error && <div className={styles.error}>{error.message}</div>}*/}
    </div>
}


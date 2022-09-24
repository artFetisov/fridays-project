import React, {ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes} from 'react'
import styles from './Checkbox.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}

export const Checkbox: FC<SuperCheckboxPropsType> = (
    {
        type,
        onChange, onChangeChecked,
        className, spanClassName,
        children,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)

        onChangeChecked && onChangeChecked(e.currentTarget.checked)
        console.log(e.currentTarget.checked)
    }

    const finalInputClassName = `${styles.checkbox} ${className ? className : ''}`

    return <div>
        <input
            id={'check'}
            type={'checkbox'}
            onChange={onChangeCallback}
            className={finalInputClassName}
            {...restProps}
        />
        <label className={styles.label} htmlFor={'check'}>
            {children && <span className={styles.spanClassName}>{children}</span>}
        </label>
    </div>
}


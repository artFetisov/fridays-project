import React, {ButtonHTMLAttributes, DetailedHTMLProps, FC} from 'react'
import styles from './Button.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
}

export const Button: FC<SuperButtonPropsType> = ({red, className, ...restProps}) => {
    const finalClassName = `${red ? styles.red : styles.default} ${className}`

    return <button
        className={finalClassName}
        {...restProps}
    />
}


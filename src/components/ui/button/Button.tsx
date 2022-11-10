import React, {ButtonHTMLAttributes, DetailedHTMLProps, FC} from 'react'
import styles from './Button.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    big?: boolean
}

export const Button: FC<SuperButtonPropsType> = ({big, className, ...restProps}) => {
    return <button
        className={`${styles.default} ${big && styles.big}`}
        {...restProps}
    />
}


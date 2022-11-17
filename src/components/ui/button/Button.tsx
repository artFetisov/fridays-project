import React, {ButtonHTMLAttributes, DetailedHTMLProps, FC} from 'react'
import styles from './Button.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    big?: boolean
    variant?: 'white' | 'blue' | 'no-radius'
}

export const Button: FC<SuperButtonPropsType> =
    ({big, className, variant, ...restProps}) => {
        return <button
            className={`${styles.default} ${big && styles.big} 
        ${variant === 'white' && styles.white}
         ${variant === 'no-radius' && styles.noRadius}`}
            {...restProps}
        />
    }


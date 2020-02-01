import React from 'react'
import styles from './FormsControls.module.css'

const FormsControl = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error: "")}>
            <div>
                {props.children}
            </div>
            {hasError && <span> {`Error: ${meta.error}`} </span>}
        </div>
    )
}

export const Textarea = (props) => {
    const { input, meta, ...restProps } = props;
    return <FormsControl {...props}> <textarea {...restProps} {...input}/> </FormsControl>
}

export const Input = (props) => {
    const { input, meta, ...restProps } = props;
    return <FormsControl {...props}> <input {...restProps} {...input}/> </FormsControl>
}
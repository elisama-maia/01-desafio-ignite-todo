import { InputHTMLAttributes } from 'react';
import styles from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type?: string;
}

export function Input({ placeholder, type = "text",  ...props }: InputProps) {
  return (
    <input className={styles.input} type={type} placeholder={placeholder} { ...props } />
  )
}

import { IconProps } from 'phosphor-react';
import { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon: React.ElementType<IconProps>;
}

export function Button({ text, icon: Icon, ...props }: ButtonProps) {
  return (
    <button className={styles.button} { ...props }>{text}<Icon className={styles.icon} size={16} /></button>
  )
}
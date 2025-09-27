import { InputHTMLAttributes, forwardRef } from 'react'
import styles from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    error,
    helperText,
    fullWidth = false,
    icon,
    className = '',
    id,
    ...props
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const hasError = Boolean(error)

    const inputClass = [
      styles.input,
      hasError && styles['input--error'],
      icon && styles['input--with-icon'],
      fullWidth && styles['input--full'],
      className
    ].filter(Boolean).join(' ')

    return (
      <div className={`${styles.inputGroup} ${fullWidth ? styles['inputGroup--full'] : ''}`}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.inputContainer}>
          {icon && (
            <div className={styles.icon} aria-hidden="true">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={inputClass}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />
        </div>
        {error && (
          <span
            id={`${inputId}-error`}
            className={styles.errorText}
            role="alert"
            aria-live="polite"
          >
            {error}
          </span>
        )}
        {helperText && !error && (
          <span
            id={`${inputId}-helper`}
            className={styles.helperText}
          >
            {helperText}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
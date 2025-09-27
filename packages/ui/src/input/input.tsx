import { InputHTMLAttributes, forwardRef } from 'react'
import './input.css'

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
      'ui-input',
      hasError && 'ui-input--error',
      icon && 'ui-input--with-icon',
      fullWidth && 'ui-input--full',
      className
    ].filter(Boolean).join(' ')

    return (
      <div className={`ui-input-group ${fullWidth ? 'ui-input-group--full' : ''}`}>
        {label && (
          <label htmlFor={inputId} className="ui-input__label">
            {label}
          </label>
        )}
        <div className="ui-input__container">
          {icon && (
            <div className="ui-input__icon" aria-hidden="true">
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
            className="ui-input__error"
            role="alert"
            aria-live="polite"
          >
            {error}
          </span>
        )}
        {helperText && !error && (
          <span
            id={`${inputId}-helper`}
            className="ui-input__helper"
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
export type { InputProps }
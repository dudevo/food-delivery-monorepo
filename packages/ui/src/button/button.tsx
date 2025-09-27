import { ButtonHTMLAttributes, forwardRef } from 'react'
import './button.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    children,
    className = '',
    disabled,
    ...props
  }, ref) => {
    const buttonClass = [
      'ui-button',
      `ui-button--${variant}`,
      `ui-button--${size}`,
      fullWidth && 'ui-button--full',
      loading && 'ui-button--loading',
      className
    ].filter(Boolean).join(' ')

    return (
      <button
        ref={ref}
        className={buttonClass}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="ui-button__spinner" aria-hidden="true">
            ⏳
          </span>
        )}
        <span className={loading ? 'ui-button__text--hidden' : undefined}>
          {children}
        </span>
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
export type { ButtonProps }
import { ButtonHTMLAttributes, forwardRef } from 'react'
import styles from './Button.module.scss'

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
      styles.button,
      styles[`button--${variant}`],
      styles[`button--${size}`],
      fullWidth && styles['button--full'],
      loading && styles['button--loading'],
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
          <span className={styles.spinner} aria-hidden="true">
            ⏳
          </span>
        )}
        <span className={loading ? styles.hiddenText : undefined}>
          {children}
        </span>
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
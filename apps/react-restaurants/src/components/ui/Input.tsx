import React, { type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, type ReactNode } from 'react';
import styles from './Input.module.scss';

interface BaseProps {
  label?: string;
  required?: boolean;
  helpText?: string;
  error?: string;
  success?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  inline?: boolean;
}

interface InputProps extends BaseProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {}

interface TextareaProps extends BaseProps, TextareaHTMLAttributes<HTMLTextAreaElement> {}

interface SelectProps extends BaseProps, Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  children: ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  required = false,
  helpText,
  error,
  success,
  icon,
  iconPosition = 'left',
  size = 'md',
  inline = false,
  className = '',
  ...props
}) => {
  const hasError = !!error;
  const hasSuccess = !!success;

  const inputClasses = [
    styles.input,
    styles[`input--${size}`],
    hasError && styles['input--error'],
    hasSuccess && styles['input--success'],
    className
  ].filter(Boolean).join(' ');

  const groupClasses = [
    styles.inputGroup,
    inline && styles['inputGroup--inline']
  ].filter(Boolean).join(' ');

  return (
    <div className={groupClasses}>
      {label && (
        <label className={`${styles.label} ${required ? styles['label--required'] : ''}`}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {icon && (
          <span className={`${styles.icon} ${styles[`icon--${iconPosition}`]}`}>
            {icon}
          </span>
        )}
        <input
          className={inputClasses}
          aria-invalid={hasError}
          aria-describedby={helpText || error || success ? `${props.id}-help` : undefined}
          {...props}
        />
      </div>
      {(helpText || error || success) && (
        <p
          id={`${props.id}-help`}
          className={`${styles.helpText} ${error ? styles['helpText--error'] : success ? styles['helpText--success'] : ''}`}
        >
          {error || success || helpText}
        </p>
      )}
    </div>
  );
};

export const Textarea: React.FC<TextareaProps> = ({
  label,
  required = false,
  helpText,
  error,
  success,
  size = 'md',
  className = '',
  ...props
}) => {
  const hasError = !!error;
  const hasSuccess = !!success;

  const textareaClasses = [
    styles.input,
    styles.textarea,
    styles[`input--${size}`],
    hasError && styles['input--error'],
    hasSuccess && styles['input--success'],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.inputGroup}>
      {label && (
        <label className={`${styles.label} ${required ? styles['label--required'] : ''}`}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <textarea
          className={textareaClasses}
          aria-invalid={hasError}
          aria-describedby={helpText || error || success ? `${props.id}-help` : undefined}
          {...props}
        />
      </div>
      {(helpText || error || success) && (
        <p
          id={`${props.id}-help`}
          className={`${styles.helpText} ${error ? styles['helpText--error'] : success ? styles['helpText--success'] : ''}`}
        >
          {error || success || helpText}
        </p>
      )}
    </div>
  );
};

export const Select: React.FC<SelectProps> = ({
  label,
  required = false,
  helpText,
  error,
  success,
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const hasError = !!error;
  const hasSuccess = !!success;

  const selectClasses = [
    styles.input,
    styles.select,
    styles[`input--${size}`],
    hasError && styles['input--error'],
    hasSuccess && styles['input--success'],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.inputGroup}>
      {label && (
        <label className={`${styles.label} ${required ? styles['label--required'] : ''}`}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <select
          className={selectClasses}
          aria-invalid={hasError}
          aria-describedby={helpText || error || success ? `${props.id}-help` : undefined}
          {...props}
        >
          {children}
        </select>
      </div>
      {(helpText || error || success) && (
        <p
          id={`${props.id}-help`}
          className={`${styles.helpText} ${error ? styles['helpText--error'] : success ? styles['helpText--success'] : ''}`}
        >
          {error || success || helpText}
        </p>
      )}
    </div>
  );
};
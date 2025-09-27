'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import styles from '../login/page.module.scss'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreeToTerms) {
      alert('Please agree to the terms and conditions')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // In a real app, handle registration here
    console.log('Registration attempt:', formData)
    setIsLoading(false)
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.container}>
        <div className={styles.authCard}>
          <div className={styles.header}>
            <h1 className={styles.title}>Create Account</h1>
            <p className={styles.subtitle}>Join FoodDelivery and start ordering today</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
              <Input
                type="text"
                label="First Name"
                value={formData.firstName}
                onChange={handleInputChange('firstName')}
                placeholder="John"
                required
                fullWidth
              />
              <Input
                type="text"
                label="Last Name"
                value={formData.lastName}
                onChange={handleInputChange('lastName')}
                placeholder="Doe"
                required
                fullWidth
              />
            </div>

            <Input
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={handleInputChange('email')}
              placeholder="john@example.com"
              required
              fullWidth
            />

            <Input
              type="tel"
              label="Phone Number"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              placeholder="+1 (555) 123-4567"
              required
              fullWidth
            />

            <Input
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleInputChange('password')}
              placeholder="Create a strong password"
              required
              fullWidth
            />

            <Input
              type="password"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange('confirmPassword')}
              placeholder="Confirm your password"
              required
              fullWidth
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
              <input
                type="checkbox"
                id="terms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                style={{ marginRight: 'var(--spacing-sm)' }}
              />
              <label htmlFor="terms" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                I agree to the{' '}
                <Link href="/terms" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
            >
              Create Account
            </Button>
          </form>

          <div className={styles.divider}>
            <span>or</span>
          </div>

          <div className={styles.socialLogin}>
            <Button variant="outline" fullWidth>
              🔍 Continue with Google
            </Button>
            <Button variant="outline" fullWidth>
              📘 Continue with Facebook
            </Button>
          </div>

          <div className={styles.footer}>
            <p>
              Already have an account?{' '}
              <Link href="/login" className={styles.signupLink}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
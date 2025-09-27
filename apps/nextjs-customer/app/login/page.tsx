'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import styles from './page.module.scss'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // In a real app, handle authentication here
    console.log('Login attempt:', { email, password })
    setIsLoading(false)
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.container}>
        <div className={styles.authCard}>
          <div className={styles.header}>
            <h1 className={styles.title}>Welcome Back</h1>
            <p className={styles.subtitle}>Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <Input
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              fullWidth
            />

            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              fullWidth
            />

            <div className={styles.formActions}>
              <Link href="/forgot-password" className={styles.forgotLink}>
                Forgot your password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
            >
              Sign In
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
              Don&apos;t have an account?{' '}
              <Link href="/signup" className={styles.signupLink}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@repo/ui/button'
import styles from './page.module.scss'

export default function Home() {
  const [address, setAddress] = useState('')

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (address.trim()) {
      window.location.href = `/restaurants?address=${encodeURIComponent(address)}`
    }
  }

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>
                Everything you crave, delivered.
              </h1>
              <p className={styles.heroSubtitle}>
                Your favorite local restaurants, delivered. Enter your address to see what's available near you.
              </p>
            </div>

            <form onSubmit={handleAddressSubmit} className={styles.addressForm}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Enter your delivery address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={styles.addressInput}
                  aria-label="Enter delivery address"
                />
                <Button type="submit" variant="primary" size="lg">
                  Find Food
                </Button>
              </div>
            </form>

            <p className={styles.signUpPrompt}>
              Sign up to get the best of your neighborhood.
            </p>
          </div>

          <div className={styles.heroImage}>
            <Image
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Delicious food delivery"
              className={styles.heroImg}
              width={1000}
              height={400}
              priority
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <div className={styles.container}>
          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <div className={styles.stepIcon}>
                <svg width="56" height="56" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <h3 className={styles.stepTitle}>Become a Dasher</h3>
              <p className={styles.stepDescription}>
                As a delivery driver, you'll make reliable money—working anytime, anywhere.
              </p>
              <Link href="/become-dasher" className={styles.stepLink}>
                Start earning →
              </Link>
            </div>

            <div className={styles.step}>
              <div className={styles.stepIcon}>
                <svg width="56" height="56" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </div>
              <h3 className={styles.stepTitle}>Become a Partner</h3>
              <p className={styles.stepDescription}>
                Grow your business and reach new customers by partnering with us.
              </p>
              <Link href="/restaurant-signup" className={styles.stepLink}>
                Get started →
              </Link>
            </div>

            <div className={styles.step}>
              <div className={styles.stepIcon}>
                <svg width="56" height="56" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className={styles.stepTitle}>Get the best DashPass experience</h3>
              <p className={styles.stepDescription}>
                Get $0 delivery fees and lower service fees with a membership.
              </p>
              <Link href="/dashpass" className={styles.stepLink}>
                Try DashPass →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          {/* Everything you crave */}
          <div className={styles.featureCard}>
            <div className={styles.featureContent}>
              <h2 className={styles.featureTitle}>Everything you crave, delivered.</h2>
              <p className={styles.featureDescription}>
                Get your favorite foods from restaurants delivered faster than you can say "delicious."
              </p>
              <Button variant="primary" size="lg">
                Start ordering
              </Button>
            </div>
            <div className={styles.featureImage}>
              <Image
                src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Delicious restaurant food"
                className={styles.featureImg}
                width={800}
                height={400}
              />
            </div>
          </div>

          {/* DashPass section */}
          <div className={styles.featureCard + ' ' + styles.featureCardReverse}>
            <div className={styles.featureImage}>
              <Image
                src="https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="DashPass delivery"
                className={styles.featureImg}
                width={800}
                height={400}
              />
            </div>
            <div className={styles.featureContent}>
              <h2 className={styles.featureTitle}>DashPass is delivery for less</h2>
              <p className={styles.featureDescription}>
                Members get a $0 Delivery Fee on orders over $12, reduced service fees, and exclusive offers.
              </p>
              <Button variant="primary" size="lg">
                Try DashPass
              </Button>
            </div>
          </div>

          {/* Grocery section */}
          <div className={styles.featureCard}>
            <div className={styles.featureContent}>
              <h2 className={styles.featureTitle}>Get groceries and convenience store items</h2>
              <p className={styles.featureDescription}>
                Get everything from produce and pantry items to beauty and baby essentials delivered in as little as 1 hour.
              </p>
              <Button variant="primary" size="lg">
                Shop now
              </Button>
            </div>
            <div className={styles.featureImage}>
              <Image
                src="https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Grocery delivery"
                className={styles.featureImg}
                width={800}
                height={400}
              />
            </div>
          </div>

          {/* Convenience section */}
          <div className={styles.featureCard + ' ' + styles.featureCardReverse}>
            <div className={styles.featureImage}>
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Convenience delivery"
                className={styles.featureImg}
                width={800}
                height={400}
              />
            </div>
            <div className={styles.featureContent}>
              <h2 className={styles.featureTitle}>Convenience stores at your doorstep</h2>
              <p className={styles.featureDescription}>
                Stock up on snacks, drinks, and daily essentials delivered from your favorite convenience stores.
              </p>
              <Button variant="primary" size="lg">
                Shop convenience
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className={styles.citiesSection}>
        <div className={styles.container}>
          <h2 className={styles.citiesTitle}>We're in your neighborhood</h2>
          <div className={styles.citiesGrid}>
            <div className={styles.cityColumn}>
              <h3>New York</h3>
              <ul>
                <li>Manhattan</li>
                <li>Brooklyn</li>
                <li>Queens</li>
                <li>Bronx</li>
              </ul>
            </div>
            <div className={styles.cityColumn}>
              <h3>Los Angeles</h3>
              <ul>
                <li>Downtown</li>
                <li>Hollywood</li>
                <li>Santa Monica</li>
                <li>Beverly Hills</li>
              </ul>
            </div>
            <div className={styles.cityColumn}>
              <h3>Chicago</h3>
              <ul>
                <li>Downtown</li>
                <li>Lincoln Park</li>
                <li>Wicker Park</li>
                <li>River North</li>
              </ul>
            </div>
            <div className={styles.cityColumn}>
              <h3>San Francisco</h3>
              <ul>
                <li>SOMA</li>
                <li>Mission</li>
                <li>Castro</li>
                <li>Nob Hill</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

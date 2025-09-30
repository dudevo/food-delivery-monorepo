'use client'

import { useState } from 'react'
import { Button } from '@repo/ui/button'
import styles from './page.module.scss'

export default function RestaurantSignup() {
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cuisine: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Restaurant signup submitted:', formData)
    // Handle form submission
  }

  return (
    <div className={styles.restaurantSignup}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Partner with Us</h1>
            <p className={styles.heroSubtitle}>
              Grow your business and reach thousands of new customers
            </p>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <h3>50K+</h3>
                <p>Restaurant partners</p>
              </div>
              <div className={styles.stat}>
                <h3>2M+</h3>
                <p>Active customers</p>
              </div>
              <div className={styles.stat}>
                <h3>30%</h3>
                <p>Average revenue increase</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefits}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why partner with us</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <h3>Reach New Customers</h3>
              <p>Connect with millions of customers actively looking for great food in your area.</p>
            </div>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <h3>Increase Revenue</h3>
              <p>Boost your sales with online ordering and delivery, without the overhead.</p>
            </div>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                </svg>
              </div>
              <h3>Easy Management</h3>
              <p>Manage orders, menu, and pricing with our intuitive partner dashboard.</p>
            </div>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3>Fast Setup</h3>
              <p>Get started quickly with our simple onboarding process and dedicated support.</p>
            </div>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3>Transparent Pricing</h3>
              <p>No hidden fees. Simple, straightforward commission structure.</p>
            </div>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </div>
              <h3>24/7 Support</h3>
              <p>Our dedicated partner support team is always here to help you succeed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.howItWorks}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>How it works</h2>
          <div className={styles.stepsGrid}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h3>Sign Up</h3>
              <p>Fill out our simple application form with your restaurant details.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3>Get Verified</h3>
              <p>Our team will review your application and help you get set up.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3>Go Live</h3>
              <p>Start receiving orders and growing your business online.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className={styles.applicationForm}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Get started today</h2>
          <p className={styles.formSubtitle}>
            Fill out the form below and we'll be in touch within 24 hours.
          </p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="restaurantName">Restaurant Name *</label>
              <input
                type="text"
                id="restaurantName"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="ownerName">Owner/Manager Name *</label>
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address">Restaurant Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="state">State *</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="zipCode">Zip Code *</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="cuisine">Cuisine Type *</label>
              <select
                id="cuisine"
                name="cuisine"
                value={formData.cuisine}
                onChange={handleChange}
                required
              >
                <option value="">Select cuisine type</option>
                <option value="american">American</option>
                <option value="asian">Asian</option>
                <option value="italian">Italian</option>
                <option value="mexican">Mexican</option>
                <option value="mediterranean">Mediterranean</option>
                <option value="indian">Indian</option>
                <option value="chinese">Chinese</option>
                <option value="japanese">Japanese</option>
                <option value="thai">Thai</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Tell us about your restaurant</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="What makes your restaurant special?"
              />
            </div>

            <Button type="submit" variant="primary" size="lg" className={styles.submitButton}>
              Submit Application
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}

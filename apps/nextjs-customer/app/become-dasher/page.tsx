'use client'

import { useState } from 'react'
import { Button } from '@repo/ui/button'
import styles from './page.module.scss'

export default function BecomeDasher() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    vehicle: 'car'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Dasher application submitted:', formData)
    // Handle form submission
  }

  return (
    <div className={styles.becomeDasher}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Become a Dasher</h1>
            <p className={styles.heroSubtitle}>
              Earn on your schedule. Deliver with us and make great money.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <h3>$25/hr</h3>
                <p>Average earnings</p>
              </div>
              <div className={styles.stat}>
                <h3>Flexible</h3>
                <p>Set your own schedule</p>
              </div>
              <div className={styles.stat}>
                <h3>Weekly</h3>
                <p>Fast pay available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefits}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why deliver with us</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3>Work anytime</h3>
              <p>Set your own schedule and work as much or as little as you want.</p>
            </div>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3>Earn more</h3>
              <p>Keep 100% of your tips plus guaranteed earnings for every delivery.</p>
            </div>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3>Be your own boss</h3>
              <p>Choose when you work and how much you earn. You're in control.</p>
            </div>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3>Fast pay</h3>
              <p>Cash out your earnings instantly, or get paid weekly via direct deposit.</p>
            </div>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke="currentColor" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <h3>Deliver anywhere</h3>
              <p>Work in your neighborhood or explore new areas of your city.</p>
            </div>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </div>
              <h3>Join the community</h3>
              <p>Connect with thousands of dashers in your area and nationwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className={styles.requirements}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Requirements</h2>
          <div className={styles.requirementsList}>
            <div className={styles.requirement}>
              <div className={styles.requirementIcon}>✓</div>
              <div>
                <h3>18 or older</h3>
                <p>You must be at least 18 years of age</p>
              </div>
            </div>
            <div className={styles.requirement}>
              <div className={styles.requirementIcon}>✓</div>
              <div>
                <h3>Valid driver's license</h3>
                <p>Have a valid U.S. driver's license</p>
              </div>
            </div>
            <div className={styles.requirement}>
              <div className={styles.requirementIcon}>✓</div>
              <div>
                <h3>Vehicle</h3>
                <p>Have access to a car, bike, or scooter</p>
              </div>
            </div>
            <div className={styles.requirement}>
              <div className={styles.requirementIcon}>✓</div>
              <div>
                <h3>Background check</h3>
                <p>Pass a background check</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className={styles.applicationForm}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Start your application</h2>
          <p className={styles.formSubtitle}>
            Fill out the form below to get started. The process takes about 5 minutes.
          </p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
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
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Where will you be dashing?"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="vehicle">Vehicle Type</label>
              <select
                id="vehicle"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                required
              >
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="scooter">Scooter</option>
                <option value="motorcycle">Motorcycle</option>
              </select>
            </div>

            <Button type="submit" variant="primary" size="lg" className={styles.submitButton}>
              Continue Application
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@repo/ui/button'
import styles from './page.module.scss'

export default function DashPass() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly')

  const plans = {
    monthly: {
      price: 9.99,
      period: 'month',
      savings: 0
    },
    annual: {
      price: 96,
      period: 'year',
      savings: 23.88
    }
  }

  return (
    <div className={styles.dashPass}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>DASHPASS</div>
            <h1 className={styles.heroTitle}>Delivery for less</h1>
            <p className={styles.heroSubtitle}>
              Get unlimited $0 delivery fees, reduced service fees, and exclusive deals
            </p>
            <div className={styles.heroPrice}>
              <span className={styles.priceLabel}>Starting at</span>
              <span className={styles.price}>$9.99</span>
              <span className={styles.pricePeriod}>/month</span>
            </div>
            <Button variant="primary" size="lg" className={styles.heroCta}>
              Start Free Trial
            </Button>
            <p className={styles.trialNote}>30-day free trial • Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefits}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>What you get with DashPass</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3>$0 Delivery Fee</h3>
              <p>Save on delivery fees for eligible orders over $12 from thousands of restaurants.</p>
            </div>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3>Lower Service Fees</h3>
              <p>Enjoy reduced service fees on all your DashPass eligible orders.</p>
            </div>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3>Exclusive Deals</h3>
              <p>Access member-only promotions and special offers throughout the year.</p>
            </div>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3>Priority Support</h3>
              <p>Get faster customer support when you need help with your orders.</p>
            </div>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
              </div>
              <h3>Pickup Offers</h3>
              <p>Get exclusive deals when you pick up your order instead of delivery.</p>
            </div>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
              <h3>More Savings</h3>
              <p>Members save an average of $5 per order with DashPass benefits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={styles.pricing}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Choose your plan</h2>
          <p className={styles.sectionSubtitle}>Try free for 30 days, then pick your plan</p>

          <div className={styles.planToggle}>
            <button
              className={`${styles.toggleButton} ${selectedPlan === 'monthly' ? styles.active : ''}`}
              onClick={() => setSelectedPlan('monthly')}
            >
              Monthly
            </button>
            <button
              className={`${styles.toggleButton} ${selectedPlan === 'annual' ? styles.active : ''}`}
              onClick={() => setSelectedPlan('annual')}
            >
              Annual
              <span className={styles.savingsBadge}>Save $24</span>
            </button>
          </div>

          <div className={styles.planCard}>
            <div className={styles.planPrice}>
              <span className={styles.planAmount}>${plans[selectedPlan].price}</span>
              <span className={styles.planPeriod}>/{plans[selectedPlan].period}</span>
            </div>
            {selectedPlan === 'annual' && (
              <p className={styles.planSavings}>Save ${plans[selectedPlan].savings}/year</p>
            )}
            <ul className={styles.planFeatures}>
              <li>✓ $0 delivery fees on eligible orders</li>
              <li>✓ Reduced service fees</li>
              <li>✓ Exclusive member deals</li>
              <li>✓ Priority customer support</li>
              <li>✓ Pickup offers</li>
              <li>✓ Cancel anytime</li>
            </ul>
            <Button variant="primary" size="lg" className={styles.planButton}>
              Start 30-Day Free Trial
            </Button>
            <p className={styles.planNote}>
              ${plans[selectedPlan].price} charged after trial. Cancel before trial ends to avoid charges.
            </p>
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
              <h3>Start Your Free Trial</h3>
              <p>Sign up and get 30 days of DashPass absolutely free.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3>Order From Thousands</h3>
              <p>Choose from thousands of restaurants and stores near you.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3>Save On Every Order</h3>
              <p>Enjoy $0 delivery fees and reduced service fees automatically.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faq}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h3>What is DashPass?</h3>
              <p>DashPass is a membership program that gives you unlimited $0 delivery fees and reduced service fees on eligible orders over $12.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>How much does DashPass cost?</h3>
              <p>DashPass costs $9.99/month or $96/year (save $24). New members get a 30-day free trial.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>Can I cancel anytime?</h3>
              <p>Yes! You can cancel your DashPass membership at any time with no cancellation fees.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>Which restaurants accept DashPass?</h3>
              <p>Thousands of restaurants and stores participate in DashPass. Look for the DashPass logo when browsing.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>Is there a minimum order?</h3>
              <p>Yes, orders must be at least $12 before fees and taxes to qualify for $0 delivery fee.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>How much can I save?</h3>
              <p>DashPass members save an average of $5 per order. The more you order, the more you save!</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContainer}>
          <h2>Ready to start saving?</h2>
          <p>Join millions of members enjoying $0 delivery fees</p>
          <Button variant="primary" size="lg">
            Start Your Free Trial
          </Button>
        </div>
      </section>
    </div>
  )
}

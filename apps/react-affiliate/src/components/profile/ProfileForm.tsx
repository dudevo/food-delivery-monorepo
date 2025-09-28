import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Button } from '@repo/ui/button'
import { Input } from '@repo/ui/input'
import styles from './ProfileForm.module.scss'

export interface ProfileFormValues {
  name: string
  email: string
  payoutMethod: string
  payoutDetails: string
  notifyCampaigns: boolean
  notifyPayouts: boolean
  notifyProductUpdates: boolean
}

interface ProfileFormProps {
  initialValues?: ProfileFormValues
  onSave: (values: ProfileFormValues) => void
}

const defaultValues: ProfileFormValues = {
  name: 'Taylor Jackson',
  email: 'taylor@affiliatecrew.com',
  payoutMethod: 'stripe',
  payoutDetails: 'acct_1234 • Stripe Express',
  notifyCampaigns: true,
  notifyPayouts: true,
  notifyProductUpdates: false
}

const ProfileForm = ({ initialValues = defaultValues, onSave }: ProfileFormProps) => {
  const [values, setValues] = useState<ProfileFormValues>(initialValues)

  const handleChange = (field: keyof ProfileFormValues) => (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value =
      event.target.type === 'checkbox'
        ? (event.target as HTMLInputElement).checked
        : event.target.value
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSave(values)
  }

  const handleReset = () => setValues(initialValues)

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <section className={styles.section} aria-labelledby="profile-info">
        <div className={styles.sectionHeader}>
          <h2 id="profile-info" className={styles.sectionTitle}>
            Profile details
          </h2>
          <p className={styles.sectionSubtitle}>
            Update your affiliate identity so we can stay aligned across campaigns.
          </p>
        </div>

        <div className={styles.grid}>
          <Input
            label="Full name"
            value={values.name}
            onChange={handleChange('name')}
            required
          />
          <Input
            type="email"
            label="Email"
            value={values.email}
            onChange={handleChange('email')}
            required
          />
        </div>
      </section>

      <section className={styles.section} aria-labelledby="payout-settings">
        <div className={styles.sectionHeader}>
          <h2 id="payout-settings" className={styles.sectionTitle}>
            Payout preferences
          </h2>
          <p className={styles.sectionSubtitle}>
            Funds are disbursed every Monday. Connect a verified payout method to avoid delays.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.selectField}>
            <label htmlFor="payout-method">Payout method</label>
            <select
              id="payout-method"
              value={values.payoutMethod}
              onChange={handleChange('payoutMethod')}
            >
              <option value="stripe">Stripe Express</option>
              <option value="paypal">PayPal Business</option>
              <option value="bank">US Bank transfer</option>
            </select>
          </div>
          <Input
            label="Account detail"
            value={values.payoutDetails}
            onChange={handleChange('payoutDetails')}
          />
        </div>
      </section>

      <section className={styles.section} aria-labelledby="notification-settings">
        <div className={styles.sectionHeader}>
          <h2 id="notification-settings" className={styles.sectionTitle}>
            Notifications
          </h2>
          <p className={styles.sectionSubtitle}>
            Choose what we share with you via email or push alerts.
          </p>
        </div>

        <fieldset className={styles.toggleList}>
          <legend className="sr-only">Notification preferences</legend>
          <label className={styles.toggleItem}>
            <input
              type="checkbox"
              checked={values.notifyCampaigns}
              onChange={handleChange('notifyCampaigns')}
            />
            <div className={styles.toggleContent}>
              <span className={styles.toggleTitle}>Campaign insights</span>
              <span className={styles.toggleDescription}>Weekly performance reports and optimization tips.</span>
            </div>
          </label>
          <label className={styles.toggleItem}>
            <input
              type="checkbox"
              checked={values.notifyPayouts}
              onChange={handleChange('notifyPayouts')}
            />
            <div className={styles.toggleContent}>
              <span className={styles.toggleTitle}>Payout updates</span>
              <span className={styles.toggleDescription}>Payout confirmations and balance alerts.</span>
            </div>
          </label>
          <label className={styles.toggleItem}>
            <input
              type="checkbox"
              checked={values.notifyProductUpdates}
              onChange={handleChange('notifyProductUpdates')}
            />
            <div className={styles.toggleContent}>
              <span className={styles.toggleTitle}>Product announcements</span>
              <span className={styles.toggleDescription}>New affiliate tools, campaigns, and betas.</span>
            </div>
          </label>
        </fieldset>
      </section>

      <div className={styles.actionBar}>
        <Button type="button" variant="ghost" onClick={handleReset}>
          Cancel
        </Button>
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  )
}

export default ProfileForm
export type { ProfileFormProps }

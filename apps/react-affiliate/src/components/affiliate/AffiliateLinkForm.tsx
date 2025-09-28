import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import { Button } from '@repo/ui/button'
import { Input } from '@repo/ui/input'
import { Calendar, Link2 } from 'lucide-react'
import styles from './AffiliateLinkForm.module.scss'

interface AffiliateLinkFormValues {
  campaign: string
  landingPage: string
  utmMedium: string
  customSlug: string
  expiration: string
  notes: string
}

interface AffiliateLinkFormProps {
  onGenerate: (payload: AffiliateLinkFormValues) => void
  isGenerating?: boolean
}

const defaultValues: AffiliateLinkFormValues = {
  campaign: 'spring-feast',
  landingPage: 'restaurant-spotlight',
  utmMedium: 'instagram',
  customSlug: 'spring-feast',
  expiration: '',
  notes: ''
}

const AffiliateLinkForm = ({ onGenerate, isGenerating = false }: AffiliateLinkFormProps) => {
  const [values, setValues] = useState(defaultValues)

  const handleChange = (field: keyof AffiliateLinkFormValues) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onGenerate(values)
  }

  const previewUrl = useMemo(() => {
    const base = 'https://fooddash.com/share'
    const params = new URLSearchParams({
      campaign: values.campaign,
      medium: values.utmMedium,
      landing: values.landingPage,
      slug: values.customSlug || 'new'
    })
    return `${base}?${params.toString()}`
  }, [values])

  return (
    <form className={styles.form} onSubmit={handleSubmit} aria-labelledby="affiliate-link-builder">
      <div className={styles.fieldGrid}>
        <label>
          <span>Campaign</span>
          <select value={values.campaign} onChange={handleChange('campaign')} aria-label="Select campaign">
            <option value="spring-feast">Spring Feast Launch</option>
            <option value="midweek-boost">Midweek Boost</option>
            <option value="family-night">Family Night Bundle</option>
          </select>
        </label>

        <label>
          <span>Landing page</span>
          <select value={values.landingPage} onChange={handleChange('landingPage')} aria-label="Select landing page">
            <option value="restaurant-spotlight">Restaurant Spotlight</option>
            <option value="bundle-offers">Bundle Offers</option>
            <option value="first-order">First Order Promo</option>
          </select>
        </label>

        <Input
          label="UTM medium"
          value={values.utmMedium}
          onChange={handleChange('utmMedium')}
          placeholder="instagram"
          icon={<Link2 size={18} />}
        />

        <Input
          label="Custom slug"
          value={values.customSlug}
          onChange={handleChange('customSlug')}
          placeholder="spring-feast"
          helperText="Optional - leave blank to auto generate"
        />
      </div>

      <div className={styles.fieldGrid}>
        <Input
          label="Expiration date"
          type="date"
          value={values.expiration}
          onChange={handleChange('expiration')}
          icon={<Calendar size={18} />}
          helperText="Leave empty for evergreen links"
        />
      </div>

      <div className={styles.textareaField}>
        <label htmlFor="link-notes">Internal notes</label>
        <textarea
          id="link-notes"
          value={values.notes}
          placeholder="Add reminders for your team"
          onChange={handleChange('notes')}
        />
        <span className={styles.helper}>Visible only to your affiliate team.</span>
      </div>

      <div>
        <p className={styles.helper} aria-live="polite">
          Preview: {previewUrl}
        </p>
      </div>

      <div className={styles.actions}>
        <Button type="submit" loading={isGenerating} aria-label="Generate affiliate link">
          Build link
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setValues(defaultValues)}
          aria-label="Reset form"
        >
          Reset
        </Button>
      </div>
    </form>
  )
}

export default AffiliateLinkForm
export type { AffiliateLinkFormProps, AffiliateLinkFormValues }

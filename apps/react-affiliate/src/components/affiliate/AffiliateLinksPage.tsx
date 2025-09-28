import { Button } from '@repo/ui/button'
import { Card } from '@repo/ui/card'
import AffiliateLinkForm from './AffiliateLinkForm'
import AffiliateLinkTable from './AffiliateLinkTable'
import type { AffiliateLinkFormValues } from './AffiliateLinkForm'
import type { AffiliateLinkRow } from './AffiliateLinkTable'
import styles from './AffiliateLinksPage.module.scss'

interface AffiliateLinksPageProps {
  links: AffiliateLinkRow[]
  onGenerateLink: (payload: AffiliateLinkFormValues) => void
}

const AffiliateLinksPage = ({ links, onGenerateLink }: AffiliateLinksPageProps) => {
  return (
    <div className={styles.page}>
      <Card className={styles.formCard} title="Generate new affiliate link">
        <div className={styles.formHeader}>
          <p className={styles.description}>
            Configure your campaign parameters and generate a shareable link with the proper tracking.
          </p>
        </div>

        <AffiliateLinkForm onGenerate={onGenerateLink} />
      </Card>

      <Card
        className={styles.linkTableCard}
        title="Live links"
        subtitle="Monitor engagement across each campaign"
        footer={
          <Button variant="outline" size="sm" onClick={() => onGenerateLink({
            campaign: 'spring-feast',
            landingPage: 'restaurant-spotlight',
            utmMedium: 'email',
            customSlug: 'spring-feast-special',
            expiration: '',
            notes: 'Quick duplicate'
          })}>
            Duplicate top performer
          </Button>
        }
      >
        <div className={styles.filters} role="group" aria-label="Link filters">
          <Button variant="ghost" size="sm">All</Button>
          <Button variant="ghost" size="sm">Active</Button>
          <Button variant="ghost" size="sm">Paused</Button>
          <Button variant="ghost" size="sm">Archived</Button>
        </div>
        <AffiliateLinkTable data={links} />
      </Card>
    </div>
  )
}

export default AffiliateLinksPage
export type { AffiliateLinksPageProps }

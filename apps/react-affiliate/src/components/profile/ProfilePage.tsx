import { Card } from '@repo/ui/card'
import ProfileForm from './ProfileForm'
import type { ProfileFormProps } from './ProfileForm'
import styles from './ProfilePage.module.scss'

interface ProfilePageProps extends ProfileFormProps {}

const ProfilePage = ({ initialValues, onSave }: ProfilePageProps) => {
  return (
    <div className={styles.page}>
      <div className={styles.cards}>
        <Card className={styles.card} title="Account tier">
          <span className={styles.cardTitle}>Premier Partner</span>
          <p className={styles.cardDescription}>
            You’re earning 18% on conversions with early access to beta campaigns.
          </p>
        </Card>
        <Card className={styles.card} title="Performance badge">
          <span className={styles.cardTitle}>Top 5% this quarter</span>
          <p className={styles.cardDescription}>
            Keep your retention rate above 70% to maintain tier benefits.
          </p>
        </Card>
      </div>

      <Card title="Profile & preferences">
        <ProfileForm initialValues={initialValues} onSave={onSave} />
      </Card>
    </div>
  )
}

export default ProfilePage
export type { ProfilePageProps }

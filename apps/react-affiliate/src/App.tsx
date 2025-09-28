import { useState, type ReactNode } from 'react'
import { Gauge, Link2, UserRound, Wallet } from 'lucide-react'
import AffiliateLinksPage from './components/affiliate/AffiliateLinksPage'
import type { AffiliateLinkFormValues } from './components/affiliate/AffiliateLinkForm'
import type { AffiliateLinkRow } from './components/affiliate/AffiliateLinkTable'
import DashboardPage from './components/dashboard/DashboardPage'
import EarningsPage from './components/earnings/EarningsPage'
import type { PayoutHistoryRow } from './components/earnings/PayoutHistoryTable'
import Layout from './components/layout/Layout'
import ProfilePage from './components/profile/ProfilePage'
import type { ProfileFormValues } from './components/profile/ProfileForm'
import type { NavigationItem, RouteKey } from './types/navigation'

const initialLinks: AffiliateLinkRow[] = [
  {
    id: '1',
    name: 'Spring Feast Launch',
    url: 'https://fooddash.com/share?campaign=spring-feast',
    clicks: 1405,
    signUps: 320,
    conversions: 210,
    status: 'active',
    updatedAt: '2h ago'
  },
  {
    id: '2',
    name: 'Midweek Boost',
    url: 'https://fooddash.com/share?campaign=midweek-boost',
    clicks: 980,
    signUps: 230,
    conversions: 160,
    status: 'active',
    updatedAt: 'Yesterday'
  },
  {
    id: '3',
    name: 'Family Night Bundle',
    url: 'https://fooddash.com/share?campaign=family-night',
    clicks: 540,
    signUps: 120,
    conversions: 80,
    status: 'paused',
    updatedAt: '3 days ago'
  }
]

const payoutHistory: PayoutHistoryRow[] = [
  {
    id: 'payout-1',
    period: 'Mar 1 – Mar 7, 2025',
    amount: '$2,140.00',
    method: 'Stripe Express',
    status: 'paid',
    processedOn: 'Mar 8, 2025'
  },
  {
    id: 'payout-2',
    period: 'Feb 22 – Feb 28, 2025',
    amount: '$1,960.00',
    method: 'Stripe Express',
    status: 'paid',
    processedOn: 'Mar 1, 2025'
  },
  {
    id: 'payout-3',
    period: 'Feb 15 – Feb 21, 2025',
    amount: '$1,540.00',
    method: 'Stripe Express',
    status: 'pending',
    processedOn: 'Processing'
  },
  {
    id: 'payout-4',
    period: 'Feb 8 – Feb 14, 2025',
    amount: '$1,120.00',
    method: 'Stripe Express',
    status: 'in-review',
    processedOn: 'Requires ID refresh'
  }
]

const profileDefaults: ProfileFormValues = {
  name: 'Taylor Jackson',
  email: 'taylor@affiliatecrew.com',
  payoutMethod: 'stripe',
  payoutDetails: 'acct_1234 • Stripe Express',
  notifyCampaigns: true,
  notifyPayouts: true,
  notifyProductUpdates: false
}

const navItems: NavigationItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: Gauge },
  { key: 'links', label: 'Links', icon: Link2, badge: 3 },
  { key: 'earnings', label: 'Earnings', icon: Wallet },
  { key: 'profile', label: 'Profile', icon: UserRound }
]

const routeCopy: Record<RouteKey, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Affiliate performance overview',
    subtitle: 'Monitor conversions, optimize campaigns, and unlock new growth opportunities.'
  },
  links: {
    title: 'Manage affiliate links',
    subtitle: 'Generate, organize, and track the impact of each campaign link.'
  },
  earnings: {
    title: 'Earnings & payouts',
    subtitle: 'Track balances, initiate payouts, and stay on top of your commissions.'
  },
  profile: {
    title: 'Profile & preferences',
    subtitle: 'Control your affiliate identity, payout settings, and notification preferences.'
  }
}

const App = () => {
  const [activeRoute, setActiveRoute] = useState<RouteKey>('dashboard')
  const [links, setLinks] = useState<AffiliateLinkRow[]>(initialLinks)
  const [profileValues, setProfileValues] = useState<ProfileFormValues>(profileDefaults)

  const { title, subtitle } = routeCopy[activeRoute]

  const handleGenerateLink = (payload: AffiliateLinkFormValues) => {
    const newLink: AffiliateLinkRow = {
      id: `link-${Date.now()}`,
      name: `${payload.campaign.replace('-', ' ')} (${payload.utmMedium})`,
      url: `https://fooddash.com/share?campaign=${payload.campaign}&medium=${payload.utmMedium}&slug=${payload.customSlug || 'new'}`,
      clicks: 0,
      signUps: 0,
      conversions: 0,
      status: 'active',
      updatedAt: 'Just now'
    }
    setLinks((prev) => [newLink, ...prev])
  }

  const handleRequestPayout = () => {
    // Placeholder for payout flow integration
    alert('Payout request submitted! Our finance team will process it shortly.')
  }

  const handleProfileSave = (values: ProfileFormValues) => {
    setProfileValues(values)
  }

  let pageContent: ReactNode = null
  if (activeRoute === 'dashboard') {
    pageContent = (
      <DashboardPage onCreateLink={() => setActiveRoute('links')} onViewReports={() => setActiveRoute('links')} />
    )
  } else if (activeRoute === 'links') {
    pageContent = <AffiliateLinksPage links={links} onGenerateLink={handleGenerateLink} />
  } else if (activeRoute === 'earnings') {
    pageContent = <EarningsPage payouts={payoutHistory} onRequestPayout={handleRequestPayout} />
  } else if (activeRoute === 'profile') {
    pageContent = <ProfilePage initialValues={profileValues} onSave={handleProfileSave} />
  }

  return (
    <Layout
      title={title}
      subtitle={subtitle}
      items={navItems}
      activeKey={activeRoute}
      onChange={setActiveRoute}
      onCreateLink={() => setActiveRoute('links')}
      onOpenSupport={() => alert('Opening support chat 🧑‍💼')}
    >
      {pageContent}
    </Layout>
  )
}

export default App

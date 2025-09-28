import { Button } from '@repo/ui/button'
import { Table } from '@repo/ui/table'
import { Check, Copy, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import styles from './AffiliateLinkTable.module.scss'

export interface AffiliateLinkRow {
  id: string
  name: string
  url: string
  clicks: number
  signUps: number
  conversions: number
  status: 'active' | 'paused' | 'archived'
  updatedAt: string
}

interface AffiliateLinkTableProps {
  data: AffiliateLinkRow[]
}

const statusClassMap: Record<AffiliateLinkRow['status'], string> = {
  active: styles.statusActive,
  paused: styles.statusPaused,
  archived: styles.statusArchived
}

const AffiliateLinkTable = ({ data }: AffiliateLinkTableProps) => {
  const [copiedLink, setCopiedLink] = useState<string>('')

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedLink(url)
      setTimeout(() => setCopiedLink(''), 2000)
    } catch (error) {
      console.error('Unable to copy link', error)
    }
  }

  return (
    <Table
      data={data}
      caption="Your generated affiliate links"
      columns={[
        {
          key: 'name',
          header: 'Campaign'
        },
        {
          key: 'url',
          header: 'Link',
          render: (row) => (
            <div>
              <a href={row.url} target="_blank" rel="noreferrer">
                {row.url}
              </a>
              <div className={styles.tableActions}>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(row.url)}
                  aria-label={`Copy link for ${row.name}`}
                >
                  {copiedLink === row.url ? (
                    <>
                      <Check size={16} aria-hidden="true" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} aria-hidden="true" /> Copy
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(row.url, '_blank')}
                  aria-label={`Open link for ${row.name}`}
                >
                  <ExternalLink size={16} aria-hidden="true" />
                  Open
                </Button>
              </div>
            </div>
          )
        },
        {
          key: 'clicks',
          header: 'Clicks',
          align: 'center'
        },
        {
          key: 'signUps',
          header: 'Sign-ups',
          align: 'center'
        },
        {
          key: 'conversions',
          header: 'Conversions',
          align: 'center'
        },
        {
          key: 'status',
          header: 'Status',
          render: (row) => (
            <span className={`${styles.status} ${statusClassMap[row.status]}`.trim()}>
              {row.status === 'active' ? 'Active' : row.status === 'paused' ? 'Paused' : 'Archived'}
            </span>
          )
        },
        {
          key: 'updatedAt',
          header: 'Updated'
        }
      ]}
      getRowId={(row) => row.id}
    />
  )
}

export default AffiliateLinkTable

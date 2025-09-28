import { Table } from '@repo/ui/table'
import styles from './PayoutHistoryTable.module.scss'

export interface PayoutHistoryRow {
  id: string
  period: string
  amount: string
  method: string
  status: 'paid' | 'pending' | 'in-review'
  processedOn: string
}

interface PayoutHistoryTableProps {
  data: PayoutHistoryRow[]
}

const statusMap: Record<PayoutHistoryRow['status'], string> = {
  paid: styles.statusPaid,
  pending: styles.statusPending,
  'in-review': styles.statusInReview
}

const labelMap: Record<PayoutHistoryRow['status'], string> = {
  paid: 'Paid',
  pending: 'Pending',
  'in-review': 'In review'
}

const PayoutHistoryTable = ({ data }: PayoutHistoryTableProps) => {
  return (
    <Table
      data={data}
      caption="Payout history"
      columns={[
        { key: 'period', header: 'Period' },
        { key: 'amount', header: 'Amount', align: 'right' },
        { key: 'method', header: 'Method' },
        {
          key: 'status',
          header: 'Status',
          render: (row) => (
            <span className={`${styles.status} ${statusMap[row.status]}`.trim()}>
              {labelMap[row.status]}
            </span>
          )
        },
        { key: 'processedOn', header: 'Processed on' }
      ]}
      getRowId={(row) => row.id}
    />
  )
}

export default PayoutHistoryTable

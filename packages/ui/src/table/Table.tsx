import type { HTMLAttributes, ReactNode } from 'react'
import './Table.css'

type Align = 'left' | 'center' | 'right'

type Column<T> = {
  key: keyof T
  header: ReactNode
  width?: string
  align?: Align
  render?: (row: T, index: number) => ReactNode
}

interface TableProps<T> extends HTMLAttributes<HTMLTableElement> {
  columns: Array<Column<T>>
  data: T[]
  caption?: ReactNode
  emptyLabel?: ReactNode
  footer?: ReactNode
  getRowId?: (row: T, index: number) => string | number
}

const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  caption,
  emptyLabel = 'No records found',
  footer,
  getRowId,
  className = '',
  ...props
}: TableProps<T>) => {
  return (
    <div className="ui-table-wrapper">
      <table className={[className, 'ui-table'].filter(Boolean).join(' ')} {...props}>
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {columns.map(({ key, header, width, align }) => (
              <th
                key={String(key)}
                style={{ width, textAlign: align }}
                scope="col"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="ui-table__empty-state">
                {emptyLabel}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={String(getRowId ? getRowId(row, rowIndex) : rowIndex)}>
                {columns.map(({ key, align, render }) => (
                  <td key={String(key)} style={{ textAlign: align }}>
                    {render ? render(row, rowIndex) : (row[key] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
        {footer && (
          <tfoot>
            <tr>
              <td colSpan={columns.length}>
                <div className="ui-table__footer">{footer}</div>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  )
}

export type { TableProps, Column }
export default Table

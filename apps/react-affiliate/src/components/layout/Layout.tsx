import type { ReactNode } from 'react'
import type { NavigationProps } from '../../types/navigation'
import BottomNav from './BottomNav'
import Footer from './Footer'
import NavBar from './NavBar'
import Sidebar from './Sidebar'
import styles from './Layout.module.scss'

interface LayoutProps extends NavigationProps {
  title: string
  subtitle?: string
  children: ReactNode
  onCreateLink: () => void
  onOpenSupport: () => void
}

const Layout = ({
  title,
  subtitle,
  children,
  items,
  activeKey,
  onChange,
  onCreateLink,
  onOpenSupport
}: LayoutProps) => {
  return (
    <div className={styles.layoutShell}>
      <NavBar
        items={items}
        activeKey={activeKey}
        onChange={onChange}
        onCreateLink={onCreateLink}
        onOpenSupport={onOpenSupport}
      />

      <div className={styles.layout}>
        <Sidebar
          items={items}
          activeKey={activeKey}
          onChange={onChange}
          onOpenSupport={onOpenSupport}
        />

        <main className={styles.main}>
          <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>{title}</h1>
            {subtitle ? <p className={styles.pageSubtitle}>{subtitle}</p> : null}
          </header>

          <section className={styles.content}>{children}</section>
        </main>
      </div>

      <Footer />

      <BottomNav items={items} activeKey={activeKey} onChange={onChange} />
    </div>
  )
}

export default Layout
export type { LayoutProps }

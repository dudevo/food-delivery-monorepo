'use client'

import { useState, ReactNode } from 'react'
import NavBar from './NavBar'
import Sidebar from './Sidebar'
import Footer from './Footer'
import MobileNavigation from './MobileNavigation'
import styles from './Layout.module.scss'

interface LayoutProps {
  children: ReactNode
  activeOrdersCount?: number
}

export default function Layout({ children, activeOrdersCount = 0 }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isOnline, setIsOnline] = useState(false)

  const handleToggleMenu = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleCloseSidebar = () => {
    setSidebarOpen(false)
  }

  const handleToggleStatus = (online: boolean) => {
    setIsOnline(online)
  }

  const contentClass = [
    styles.content,
    sidebarCollapsed && styles['content--collapsed'],
    !sidebarOpen && styles['content--no-sidebar']
  ].filter(Boolean).join(' ')

  return (
    <div className={styles.layout}>
      <NavBar
        onToggleMenu={handleToggleMenu}
        isOnline={isOnline}
        onToggleStatus={handleToggleStatus}
      />

      <div className={styles.main}>
        <Sidebar
          isOpen={sidebarOpen}
          isCollapsed={sidebarCollapsed}
          onClose={handleCloseSidebar}
          activeOrdersCount={activeOrdersCount}
        />

        <div className={contentClass}>
          <main className={styles.contentArea}>
            {children}
          </main>
          <Footer />
        </div>
      </div>

      <MobileNavigation activeOrdersCount={activeOrdersCount} />
    </div>
  )
}
import NavBar from './NavBar'
import Footer from './Footer'
import MobileNavigation from './MobileNavigation'
import styles from './Layout.module.scss'

interface LayoutProps {
  children: React.ReactNode
  currentUser?: {
    name: string
    avatar?: string
  }
}

export default function Layout({ children, currentUser }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <NavBar currentUser={currentUser} />
      <main className={styles.main} id="main-content">
        {children}
      </main>
      <Footer />
      <MobileNavigation />
    </div>
  )
}
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { MobileNavigation } from './MobileNavigation';
import styles from './Layout.module.scss';

export const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Auto-collapse sidebar on small screens
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarItemClick = () => {
    // Close sidebar on mobile when item is clicked
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleToggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleOverlayClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className={styles.layout}>
      {/* Desktop Sidebar */}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles['sidebar--open'] : ''} ${sidebarCollapsed ? styles['sidebar--collapsed'] : ''}`}>
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={handleToggleCollapse}
          onItemClick={handleSidebarItemClick}
        />
      </div>

      {/* Overlay for mobile */}
      <div
        className={`${styles.overlay} ${sidebarOpen ? styles['overlay--visible'] : ''}`}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className={styles.mainContent}>
        <NavBar onMenuToggle={handleMenuToggle} />

        <main className={styles.content}>
          <Outlet />
        </main>

        <Footer />
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
};
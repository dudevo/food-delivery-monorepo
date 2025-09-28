import React, { useState, useMemo } from 'react';
import { MenuItemCard, type MenuItem } from '../components/menu/MenuItemCard';
import { MenuItemForm } from '../components/menu/MenuItemForm';
import styles from './Menu.module.scss';

// Mock data for menu items
const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella, tomato sauce, and basil on crispy thin crust',
    price: 16.99,
    category: 'Main Courses',
    image: '',
    isAvailable: true,
    preparationTime: 15,
    allergens: ['Gluten', 'Dairy'],
    nutritionInfo: {
      calories: 280,
      protein: 12,
      carbs: 35,
      fat: 10
    },
    stats: {
      ordersToday: 12,
      totalOrders: 247,
      rating: 4.6,
      reviews: 89
    }
  },
  {
    id: '2',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with parmesan cheese, croutons, and our signature Caesar dressing',
    price: 12.99,
    category: 'Salads',
    image: '',
    isAvailable: true,
    preparationTime: 8,
    allergens: ['Eggs', 'Dairy'],
    nutritionInfo: {
      calories: 220,
      protein: 8,
      carbs: 15,
      fat: 16
    },
    stats: {
      ordersToday: 8,
      totalOrders: 156,
      rating: 4.3,
      reviews: 42
    }
  },
  {
    id: '3',
    name: 'Grilled Salmon',
    description: 'Atlantic salmon grilled to perfection with seasonal vegetables and lemon butter sauce',
    price: 24.99,
    category: 'Main Courses',
    image: '',
    isAvailable: false,
    preparationTime: 20,
    allergens: ['Fish'],
    nutritionInfo: {
      calories: 350,
      protein: 32,
      carbs: 8,
      fat: 22
    },
    stats: {
      ordersToday: 3,
      totalOrders: 98,
      rating: 4.8,
      reviews: 67
    }
  },
  {
    id: '4',
    name: 'Chocolate Brownie',
    description: 'Rich chocolate brownie served warm with vanilla ice cream',
    price: 8.99,
    category: 'Desserts',
    image: '',
    isAvailable: true,
    preparationTime: 5,
    allergens: ['Eggs', 'Dairy', 'Gluten'],
    nutritionInfo: {
      calories: 450,
      protein: 6,
      carbs: 52,
      fat: 24
    },
    stats: {
      ordersToday: 15,
      totalOrders: 203,
      rating: 4.7,
      reviews: 78
    }
  },
  {
    id: '5',
    name: 'Craft Beer Selection',
    description: 'Selection of local craft beers on tap',
    price: 6.99,
    category: 'Beverages',
    image: '',
    isAvailable: true,
    preparationTime: 2,
    allergens: ['Gluten'],
    stats: {
      ordersToday: 22,
      totalOrders: 445,
      rating: 4.4,
      reviews: 134
    }
  }
];

const CATEGORIES = ['All', 'Appetizers', 'Main Courses', 'Desserts', 'Beverages', 'Sides', 'Salads', 'Soups', 'Specials'];

export const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Filter and search menu items
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [menuItems, searchQuery, selectedCategory]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalItems = menuItems.length;
    const availableItems = menuItems.filter(item => item.isAvailable).length;
    const totalOrdersToday = menuItems.reduce((sum, item) => sum + (item.stats?.ordersToday || 0), 0);
    const avgRating = menuItems.reduce((sum, item) => sum + (item.stats?.rating || 0), 0) / totalItems;

    return {
      totalItems,
      availableItems,
      totalOrdersToday,
      avgRating: isNaN(avgRating) ? 0 : avgRating
    };
  }, [menuItems]);

  const handleAddItem = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDeleteItem = (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      setMenuItems(prev => prev.filter(item => item.id !== itemId));
    }
  };

  const handleToggleAvailability = (itemId: string) => {
    setMenuItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item
    ));
  };

  const handleFormSubmit = (formData: Omit<MenuItem, 'id' | 'stats'>) => {
    if (editingItem) {
      // Update existing item
      setMenuItems(prev => prev.map(item =>
        item.id === editingItem.id
          ? { ...item, ...formData }
          : item
      ));
    } else {
      // Add new item
      const newItem: MenuItem = {
        ...formData,
        id: Date.now().toString(),
        stats: {
          ordersToday: 0,
          totalOrders: 0,
          rating: 0,
          reviews: 0
        }
      };
      setMenuItems(prev => [...prev, newItem]);
    }
  };

  return (
    <div className={styles.menuPage}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Menu Management</h1>
          <p className={styles.pageSubtitle}>
            Manage your restaurant's menu items, pricing, and availability
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.addButton} onClick={handleAddItem}>
            <span>+</span>
            Add Menu Item
          </button>
        </div>
      </div>

      {/* Menu Stats */}
      <div className={styles.menuStats}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles['statIcon--primary']}`}>
            🍽️
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>{stats.totalItems}</h3>
            <p className={styles.statLabel}>Total Menu Items</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles['statIcon--success']}`}>
            ✅
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>{stats.availableItems}</h3>
            <p className={styles.statLabel}>Available Items</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles['statIcon--info']}`}>
            📊
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>{stats.totalOrdersToday}</h3>
            <p className={styles.statLabel}>Orders Today</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles['statIcon--warning']}`}>
            ⭐
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>{stats.avgRating.toFixed(1)}</h3>
            <p className={styles.statLabel}>Average Rating</p>
          </div>
        </div>
      </div>

      {/* Menu Controls */}
      <div className={styles.menuControls}>
        <div className={styles.filterControls}>
          <input
            type="text"
            placeholder="Search menu items..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className={styles.categoryFilter}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewButton} ${viewMode === 'grid' ? styles['viewButton--active'] : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </button>
          <button
            className={`${styles.viewButton} ${viewMode === 'list' ? styles['viewButton--active'] : ''}`}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
        </div>
      </div>

      {/* Menu Items Grid */}
      {filteredItems.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            {searchQuery || selectedCategory !== 'All' ? '🔍' : '🍽️'}
          </div>
          <h3 className={styles.emptyTitle}>
            {searchQuery || selectedCategory !== 'All' ? 'No items found' : 'No menu items yet'}
          </h3>
          <p className={styles.emptyDescription}>
            {searchQuery || selectedCategory !== 'All'
              ? 'Try adjusting your search or filter criteria to find what you\'re looking for.'
              : 'Start building your menu by adding your first menu item.'
            }
          </p>
          {(!searchQuery && selectedCategory === 'All') && (
            <button className={styles.addButton} onClick={handleAddItem}>
              <span>+</span>
              Add Your First Item
            </button>
          )}
        </div>
      ) : (
        <div className={`${styles.menuGrid} ${styles[`menuGrid--${viewMode}`]}`}>
          {filteredItems.map(item => (
            <MenuItemCard
              key={item.id}
              item={item}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
              onToggleAvailability={handleToggleAvailability}
              showStats={true}
            />
          ))}
        </div>
      )}

      {/* Menu Item Form Modal */}
      <MenuItemForm
        item={editingItem}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};
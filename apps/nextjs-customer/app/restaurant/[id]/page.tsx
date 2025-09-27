'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import MenuItemCard from '../../components/ui/MenuItemCard'
import styles from './page.module.scss'

// Mock data - in a real app this would come from an API
const restaurantData = {
  id: '1',
  name: 'Mama\'s Italian Kitchen',
  image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop',
  cuisine: 'Italian',
  rating: 4.8,
  reviewCount: 234,
  deliveryTime: '25-35 min',
  deliveryFee: 2.99,
  minimumOrder: 15,
  priceRange: '$$',
  isOpen: true,
  description: 'Authentic Italian cuisine made with fresh ingredients and traditional recipes passed down through generations.',
  address: '123 Main Street, Downtown',
  phone: '+1 (555) 123-4567',
  hours: {
    'Monday': '11:00 AM - 10:00 PM',
    'Tuesday': '11:00 AM - 10:00 PM',
    'Wednesday': '11:00 AM - 10:00 PM',
    'Thursday': '11:00 AM - 10:00 PM',
    'Friday': '11:00 AM - 11:00 PM',
    'Saturday': '12:00 PM - 11:00 PM',
    'Sunday': '12:00 PM - 9:00 PM'
  },
  menu: [
    {
      category: 'Appetizers',
      items: [
        {
          id: 'app1',
          name: 'Bruschetta Classica',
          description: 'Toasted bread topped with fresh tomatoes, basil, and garlic',
          price: 8.99,
          image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=120&h=120&fit=crop',
          category: 'Appetizers',
          isVegetarian: true,
          isPopular: true
        },
        {
          id: 'app2',
          name: 'Antipasto Platter',
          description: 'Selection of cured meats, cheeses, olives, and roasted vegetables',
          price: 16.99,
          image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=120&h=120&fit=crop',
          category: 'Appetizers'
        }
      ]
    },
    {
      category: 'Pasta',
      items: [
        {
          id: 'pasta1',
          name: 'Spaghetti Carbonara',
          description: 'Classic Roman pasta with eggs, cheese, pancetta, and black pepper',
          price: 18.99,
          image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=120&h=120&fit=crop',
          category: 'Pasta',
          isPopular: true
        },
        {
          id: 'pasta2',
          name: 'Fettuccine Alfredo',
          description: 'Creamy parmesan sauce with fresh fettuccine pasta',
          price: 16.99,
          image: 'https://images.unsplash.com/photo-1626844131082-256783844137?w=120&h=120&fit=crop',
          category: 'Pasta',
          isVegetarian: true
        },
        {
          id: 'pasta3',
          name: 'Penne Arrabbiata',
          description: 'Spicy tomato sauce with garlic and red chili peppers',
          price: 15.99,
          image: 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=120&h=120&fit=crop',
          category: 'Pasta',
          isVegetarian: true,
          isSpicy: true
        }
      ]
    },
    {
      category: 'Pizza',
      items: [
        {
          id: 'pizza1',
          name: 'Margherita',
          description: 'Fresh mozzarella, tomato sauce, and basil',
          price: 14.99,
          image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=120&h=120&fit=crop',
          category: 'Pizza',
          isVegetarian: true,
          isPopular: true
        },
        {
          id: 'pizza2',
          name: 'Pepperoni',
          description: 'Classic pepperoni with mozzarella cheese and tomato sauce',
          price: 16.99,
          image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=120&h=120&fit=crop',
          category: 'Pizza'
        }
      ]
    },
    {
      category: 'Desserts',
      items: [
        {
          id: 'dessert1',
          name: 'Tiramisu',
          description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone',
          price: 7.99,
          image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=120&h=120&fit=crop',
          category: 'Desserts',
          isVegetarian: true
        }
      ]
    }
  ]
}

export default function RestaurantDetailPage() {
  const [activeCategory, setActiveCategory] = useState('Appetizers')
  const [cartItems, setCartItems] = useState<Record<string, number>>({})

  const handleAddToCart = (itemId: string, quantity: number) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + quantity
    }))
  }

  const categories = restaurantData.menu.map(section => section.category)
  const totalCartItems = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0)

  return (
    <div className={styles.restaurantPage}>
      {/* Restaurant Header */}
      <div className={styles.header}>
        <div className={styles.imageContainer}>
          <Image
            src={restaurantData.image}
            alt={restaurantData.name}
            width={800}
            height={400}
            className={styles.headerImage}
          />
          <div className={styles.headerOverlay}>
            <Link href="/restaurants" className={styles.backButton}>
              ← Back to restaurants
            </Link>
          </div>
        </div>

        <div className={styles.restaurantInfo}>
          <div className={styles.container}>
            <div className={styles.infoContent}>
              <div className={styles.mainInfo}>
                <h1 className={styles.restaurantName}>{restaurantData.name}</h1>
                <p className={styles.description}>{restaurantData.description}</p>

                <div className={styles.details}>
                  <div className={styles.rating}>
                    <span className={styles.ratingValue}>⭐ {restaurantData.rating}</span>
                    <span className={styles.reviewCount}>({restaurantData.reviewCount} reviews)</span>
                  </div>
                  <div className={styles.cuisine}>{restaurantData.cuisine}</div>
                  <div className={styles.priceRange}>{restaurantData.priceRange}</div>
                </div>

                <div className={styles.orderInfo}>
                  <div className={styles.deliveryTime}>
                    🚚 {restaurantData.deliveryTime}
                  </div>
                  <div className={styles.deliveryFee}>
                    Delivery: ${restaurantData.deliveryFee}
                  </div>
                  <div className={styles.minimumOrder}>
                    Min. order: ${restaurantData.minimumOrder}
                  </div>
                </div>
              </div>

              <div className={styles.status}>
                <div className={`${styles.statusBadge} ${restaurantData.isOpen ? styles.open : styles.closed}`}>
                  {restaurantData.isOpen ? '🟢 Open' : '🔴 Closed'}
                </div>
                {!restaurantData.isOpen && (
                  <p className={styles.reopenTime}>Opens tomorrow at 11:00 AM</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Navigation */}
      <div className={styles.menuNav}>
        <div className={styles.container}>
          <nav className={styles.categoryTabs} aria-label="Menu categories">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`${styles.categoryTab} ${activeCategory === category ? styles.active : ''}`}
                aria-current={activeCategory === category ? 'page' : undefined}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Menu Content */}
      <div className={styles.menuContent}>
        <div className={styles.container}>
          <div className={styles.menu}>
            {restaurantData.menu.map(section => (
              <div
                key={section.category}
                className={`${styles.menuSection} ${activeCategory === section.category ? styles.active : ''}`}
                id={section.category.toLowerCase()}
              >
                <h2 className={styles.categoryTitle}>{section.category}</h2>
                <div className={styles.menuItems}>
                  {section.items.map(item => (
                    <MenuItemCard
                      key={item.id}
                      {...item}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Float Button */}
      {totalCartItems > 0 && (
        <Link href="/cart" className={styles.cartFloat}>
          <span className={styles.cartText}>
            View Cart ({totalCartItems})
          </span>
          <span className={styles.cartIcon}>🛒</span>
        </Link>
      )}
    </div>
  )
}
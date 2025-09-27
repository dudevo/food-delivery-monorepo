'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import FilterBar from '../components/ui/FilterBar'
import RestaurantCard from '../components/ui/RestaurantCard'
import styles from './page.module.scss'

// Mock data - in a real app this would come from an API
const allRestaurants = [
  {
    id: '1',
    name: 'Mama\'s Italian Kitchen',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop',
    cuisine: 'Italian',
    rating: 4.8,
    deliveryTime: '25-35 min',
    priceRange: '$$' as const,
    isOpen: true,
    featured: true
  },
  {
    id: '2',
    name: 'Tokyo Sushi Express',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop',
    cuisine: 'Japanese',
    rating: 4.9,
    deliveryTime: '20-30 min',
    priceRange: '$$$' as const,
    isOpen: true,
    featured: true
  },
  {
    id: '3',
    name: 'Burger Palace',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
    cuisine: 'American',
    rating: 4.6,
    deliveryTime: '15-25 min',
    priceRange: '$' as const,
    isOpen: true
  },
  {
    id: '4',
    name: 'Spice Garden',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=200&fit=crop',
    cuisine: 'Indian',
    rating: 4.7,
    deliveryTime: '30-40 min',
    priceRange: '$$' as const,
    isOpen: false
  },
  {
    id: '5',
    name: 'Dragon House Chinese',
    image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=300&h=200&fit=crop',
    cuisine: 'Chinese',
    rating: 4.5,
    deliveryTime: '20-30 min',
    priceRange: '$' as const,
    isOpen: true
  },
  {
    id: '6',
    name: 'La Baguette French Bistro',
    image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=300&h=200&fit=crop',
    cuisine: 'French',
    rating: 4.9,
    deliveryTime: '35-45 min',
    priceRange: '$$$' as const,
    isOpen: true
  },
  {
    id: '7',
    name: 'Taco Fiesta',
    image: 'https://images.unsplash.com/photo-1565299585323-38174c4a6c35?w=300&h=200&fit=crop',
    cuisine: 'Mexican',
    rating: 4.4,
    deliveryTime: '20-30 min',
    priceRange: '$' as const,
    isOpen: true
  },
  {
    id: '8',
    name: 'The Greek Corner',
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=300&h=200&fit=crop',
    cuisine: 'Greek',
    rating: 4.6,
    deliveryTime: '25-35 min',
    priceRange: '$$' as const,
    isOpen: true
  }
]

const cuisineFilters = [
  { id: 'italian', label: 'Italian', count: 1 },
  { id: 'japanese', label: 'Japanese', count: 1 },
  { id: 'american', label: 'American', count: 1 },
  { id: 'indian', label: 'Indian', count: 1 },
  { id: 'chinese', label: 'Chinese', count: 1 },
  { id: 'french', label: 'French', count: 1 },
  { id: 'mexican', label: 'Mexican', count: 1 },
  { id: 'greek', label: 'Greek', count: 1 }
]

const priceFilters = [
  { id: '$', label: '$', count: 3 },
  { id: '$$', label: '$$', count: 3 },
  { id: '$$$', label: '$$$', count: 2 }
]

const dietaryFilters = [
  { id: 'vegetarian', label: 'Vegetarian', count: 6 },
  { id: 'vegan', label: 'Vegan', count: 4 },
  { id: 'gluten-free', label: 'Gluten Free', count: 5 },
  { id: 'halal', label: 'Halal', count: 3 }
]

const sortOptions = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'rating', label: 'Rating' },
  { id: 'delivery-time', label: 'Delivery Time' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' }
]

function RestaurantsContent() {
  const searchParams = useSearchParams()
  const [filteredRestaurants, setFilteredRestaurants] = useState(allRestaurants)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const search = searchParams.get('search')
    const cuisine = searchParams.get('cuisine')

    if (search) {
      setSearchQuery(search)
    }

    // Apply initial filters based on URL params
    let filtered = [...allRestaurants]

    if (search) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (cuisine) {
      filtered = filtered.filter(restaurant =>
        restaurant.cuisine.toLowerCase() === cuisine.toLowerCase()
      )
    }

    setFilteredRestaurants(filtered)
  }, [searchParams])

  const handleFilterChange = (filters: {
    cuisines: string[]
    prices: string[]
    dietary: string[]
    sort: string
  }) => {
    let filtered = [...allRestaurants]

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply cuisine filters
    if (filters.cuisines.length > 0) {
      filtered = filtered.filter(restaurant =>
        filters.cuisines.some(cuisine =>
          restaurant.cuisine.toLowerCase() === cuisine.toLowerCase()
        )
      )
    }

    // Apply price filters
    if (filters.prices.length > 0) {
      filtered = filtered.filter(restaurant =>
        filters.prices.includes(restaurant.priceRange)
      )
    }

    // Apply sorting
    switch (filters.sort) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'delivery-time':
        filtered.sort((a, b) => {
          const aTime = parseInt(a.deliveryTime.split('-')[0])
          const bTime = parseInt(b.deliveryTime.split('-')[0])
          return aTime - bTime
        })
        break
      case 'price-low':
        filtered.sort((a, b) => a.priceRange.length - b.priceRange.length)
        break
      case 'price-high':
        filtered.sort((a, b) => b.priceRange.length - a.priceRange.length)
        break
      default:
        // Relevance - featured first, then by rating
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return b.rating - a.rating
        })
    }

    setFilteredRestaurants(filtered)
  }

  const openRestaurantsCount = filteredRestaurants.filter(r => r.isOpen).length
  const closedRestaurantsCount = filteredRestaurants.filter(r => !r.isOpen).length

  return (
    <div className={styles.restaurantsPage}>
      <FilterBar
        cuisineFilters={cuisineFilters}
        priceFilters={priceFilters}
        dietaryFilters={dietaryFilters}
        sortOptions={sortOptions}
        onFilterChange={handleFilterChange}
      />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {searchQuery ? `Results for "${searchQuery}"` : 'All Restaurants'}
          </h1>
          <p className={styles.subtitle}>
            {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} found
            {openRestaurantsCount !== filteredRestaurants.length && (
              <span className={styles.availability}>
                • {openRestaurantsCount} open, {closedRestaurantsCount} closed
              </span>
            )}
          </p>
        </div>

        <div className={styles.content}>
          {filteredRestaurants.length > 0 ? (
            <div className={styles.restaurantGrid}>
              {filteredRestaurants.map(restaurant => (
                <RestaurantCard
                  key={restaurant.id}
                  {...restaurant}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🔍</div>
              <h2 className={styles.emptyTitle}>No restaurants found</h2>
              <p className={styles.emptyDescription}>
                Try adjusting your filters or search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function RestaurantsPage() {
  return (
    <Suspense fallback={
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        fontSize: '1.125rem',
        color: 'var(--text-secondary)'
      }}>
        Loading restaurants...
      </div>
    }>
      <RestaurantsContent />
    </Suspense>
  )
}
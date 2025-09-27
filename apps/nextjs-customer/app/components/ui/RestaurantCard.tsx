import Link from 'next/link'
import Image from 'next/image'
import styles from './RestaurantCard.module.scss'

interface RestaurantCardProps {
  id: string
  name: string
  image: string
  cuisine: string
  rating: number
  deliveryTime: string
  priceRange: '$' | '$$' | '$$$'
  isOpen: boolean
  featured?: boolean
}

export default function RestaurantCard({
  id,
  name,
  image,
  cuisine,
  rating,
  deliveryTime,
  priceRange,
  isOpen,
  featured = false
}: RestaurantCardProps) {
  return (
    <Link
      href={`/restaurant/${id}`}
      className={`${styles.card} ${featured ? styles.featured : ''} ${!isOpen ? styles.closed : ''}`}
      aria-label={`${name} restaurant`}
    >
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt={name}
          width={300}
          height={200}
          className={styles.image}
        />
        {featured && (
          <div className={styles.featuredBadge} aria-label="Featured restaurant">
            ⭐ Featured
          </div>
        )}
        {!isOpen && (
          <div className={styles.closedOverlay}>
            <span className={styles.closedText}>Closed</span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.rating} aria-label={`Rating: ${rating} out of 5 stars`}>
            <span className={styles.star} aria-hidden="true">⭐</span>
            <span className={styles.ratingValue}>{rating}</span>
          </div>
        </div>

        <p className={styles.cuisine}>{cuisine}</p>

        <div className={styles.footer}>
          <div className={styles.info}>
            <span className={styles.deliveryTime} aria-label={`Delivery time: ${deliveryTime}`}>
              🚚 {deliveryTime}
            </span>
            <span className={styles.priceRange} aria-label={`Price range: ${priceRange}`}>
              {priceRange}
            </span>
          </div>
          {!isOpen && (
            <span className={styles.statusBadge} aria-label="Restaurant is closed">
              Closed
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
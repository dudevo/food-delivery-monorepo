'use client'

import { useState } from 'react'
import Image from 'next/image'
import Button from './Button'
import styles from './MenuItemCard.module.scss'

interface MenuItemCardProps {
  id: string
  name: string
  description: string
  price: number
  image?: string
  category?: string
  isVegetarian?: boolean
  isSpicy?: boolean
  isPopular?: boolean
  onAddToCart?: (id: string, quantity: number) => void
}

export default function MenuItemCard({
  id,
  name,
  description,
  price,
  image,
  isVegetarian = false,
  isSpicy = false,
  isPopular = false,
  onAddToCart
}: MenuItemCardProps) {
  const [quantity, setQuantity] = useState(0)

  const handleAddToCart = () => {
    if (quantity > 0 && onAddToCart) {
      onAddToCart(id, quantity)
    }
  }

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(0, prev - 1))
  }

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h3 className={styles.name}>{name}</h3>
            <div className={styles.badges}>
              {isPopular && (
                <span className={styles.popularBadge} aria-label="Popular item">
                  🔥 Popular
                </span>
              )}
              {isVegetarian && (
                <span className={styles.vegBadge} aria-label="Vegetarian">
                  🌱
                </span>
              )}
              {isSpicy && (
                <span className={styles.spicyBadge} aria-label="Spicy">
                  🌶️
                </span>
              )}
            </div>
          </div>
          <div className={styles.price}>
            ${price.toFixed(2)}
          </div>
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.actions}>
          {quantity === 0 ? (
            <Button
              variant="outline"
              size="sm"
              onClick={incrementQuantity}
              className={styles.addButton}
            >
              Add to Cart
            </Button>
          ) : (
            <div className={styles.quantityControls}>
              <button
                onClick={decrementQuantity}
                className={styles.quantityButton}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className={styles.quantity} aria-label={`Quantity: ${quantity}`}>
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className={styles.quantityButton}
                aria-label="Increase quantity"
              >
                +
              </button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddToCart}
                className={styles.addToCartButton}
              >
                Add ${(price * quantity).toFixed(2)}
              </Button>
            </div>
          )}
        </div>
      </div>

      {image && (
        <div className={styles.imageContainer}>
          <Image
            src={image}
            alt={name}
            width={120}
            height={120}
            className={styles.image}
          />
        </div>
      )}
    </div>
  )
}
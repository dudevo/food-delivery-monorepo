'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import styles from './page.module.scss'

// Mock cart data
const mockCartItems = [
  {
    id: 'pasta1',
    name: 'Spaghetti Carbonara',
    restaurant: 'Mama\'s Italian Kitchen',
    price: 18.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=80&h=80&fit=crop',
    specialInstructions: 'Extra cheese please'
  },
  {
    id: 'pizza1',
    name: 'Margherita Pizza',
    restaurant: 'Mama\'s Italian Kitchen',
    price: 14.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=80&h=80&fit=crop'
  }
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id))
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  const updateSpecialInstructions = (id: string, instructions: string) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, specialInstructions: instructions } : item
      )
    )
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'welcome20') {
      setPromoApplied(true)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deliveryFee = 2.99
  const tax = subtotal * 0.08
  const discount = promoApplied ? subtotal * 0.2 : 0
  const total = subtotal + deliveryFee + tax - discount

  if (cartItems.length === 0) {
    return (
      <div className={styles.cartPage}>
        <div className={styles.container}>
          <div className={styles.emptyCart}>
            <div className={styles.emptyIcon}>🛒</div>
            <h1 className={styles.emptyTitle}>Your cart is empty</h1>
            <p className={styles.emptyDescription}>
              Add some delicious items from our restaurants to get started!
            </p>
            <Link href="/restaurants">
              <Button variant="primary" size="lg">
                Browse Restaurants
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.cartPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Your Cart</h1>
          <p className={styles.subtitle}>
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} from {cartItems[0]?.restaurant}
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.cartItems}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className={styles.image}
                  />
                </div>

                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemPrice}>${item.price.toFixed(2)} each</p>

                  <div className={styles.quantityControls}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className={styles.quantityButton}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className={styles.quantityButton}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div className={styles.specialInstructions}>
                    <Input
                      placeholder="Special instructions (optional)"
                      value={item.specialInstructions || ''}
                      onChange={(e) => updateSpecialInstructions(item.id, e.target.value)}
                      fullWidth
                    />
                  </div>
                </div>

                <div className={styles.itemTotal}>
                  <span className={styles.totalPrice}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 0)}
                    className={styles.removeButton}
                    aria-label="Remove item from cart"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.orderSummary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.summaryLine}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className={styles.summaryLine}>
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>

            <div className={styles.summaryLine}>
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            {promoApplied && (
              <div className={`${styles.summaryLine} ${styles.discount}`}>
                <span>Discount (WELCOME20)</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className={styles.promoCode}>
              <div className={styles.promoInput}>
                <Input
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={applyPromoCode}
                  disabled={promoApplied}
                >
                  Apply
                </Button>
              </div>
              {promoApplied && (
                <p className={styles.promoSuccess}>✅ Promo code applied!</p>
              )}
            </div>

            <div className={`${styles.summaryLine} ${styles.total}`}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link href="/checkout" className={styles.checkoutButton}>
              <Button variant="primary" size="lg" fullWidth>
                Proceed to Checkout
              </Button>
            </Link>

            <p className={styles.deliveryTime}>
              🚚 Estimated delivery: 25-35 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import Button from './Button'
import styles from './FilterBar.module.scss'

interface FilterOption {
  id: string
  label: string
  count?: number
}

interface FilterBarProps {
  cuisineFilters: FilterOption[]
  priceFilters: FilterOption[]
  dietaryFilters: FilterOption[]
  sortOptions: FilterOption[]
  onFilterChange: (filters: {
    cuisines: string[]
    prices: string[]
    dietary: string[]
    sort: string
  }) => void
}

export default function FilterBar({
  cuisineFilters,
  priceFilters,
  dietaryFilters,
  sortOptions,
  onFilterChange
}: FilterBarProps) {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [selectedPrices, setSelectedPrices] = useState<string[]>([])
  const [selectedDietary, setSelectedDietary] = useState<string[]>([])
  const [selectedSort, setSelectedSort] = useState<string>('relevance')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleCuisineToggle = (cuisineId: string) => {
    const newCuisines = selectedCuisines.includes(cuisineId)
      ? selectedCuisines.filter(id => id !== cuisineId)
      : [...selectedCuisines, cuisineId]

    setSelectedCuisines(newCuisines)
    updateFilters(newCuisines, selectedPrices, selectedDietary, selectedSort)
  }

  const handlePriceToggle = (priceId: string) => {
    const newPrices = selectedPrices.includes(priceId)
      ? selectedPrices.filter(id => id !== priceId)
      : [...selectedPrices, priceId]

    setSelectedPrices(newPrices)
    updateFilters(selectedCuisines, newPrices, selectedDietary, selectedSort)
  }

  const handleDietaryToggle = (dietaryId: string) => {
    const newDietary = selectedDietary.includes(dietaryId)
      ? selectedDietary.filter(id => id !== dietaryId)
      : [...selectedDietary, dietaryId]

    setSelectedDietary(newDietary)
    updateFilters(selectedCuisines, selectedPrices, newDietary, selectedSort)
  }

  const handleSortChange = (sortId: string) => {
    setSelectedSort(sortId)
    updateFilters(selectedCuisines, selectedPrices, selectedDietary, sortId)
  }

  const updateFilters = (cuisines: string[], prices: string[], dietary: string[], sort: string) => {
    onFilterChange({
      cuisines,
      prices,
      dietary,
      sort
    })
  }

  const clearAllFilters = () => {
    setSelectedCuisines([])
    setSelectedPrices([])
    setSelectedDietary([])
    setSelectedSort('relevance')
    updateFilters([], [], [], 'relevance')
  }

  const hasActiveFilters = selectedCuisines.length > 0 || selectedPrices.length > 0 || selectedDietary.length > 0

  return (
    <div className={styles.filterBar}>
      <div className={styles.container}>
        {/* Mobile Filter Toggle */}
        <div className={styles.mobileHeader}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={styles.filterToggle}
            aria-expanded={isExpanded}
            aria-controls="filter-content"
          >
            🔍 Filters
            {hasActiveFilters && (
              <span className={styles.activeIndicator} aria-label="Active filters">
                {selectedCuisines.length + selectedPrices.length + selectedDietary.length}
              </span>
            )}
          </button>

          <div className={styles.sortContainer}>
            <label htmlFor="sort-select" className={styles.sortLabel}>
              Sort by:
            </label>
            <select
              id="sort-select"
              value={selectedSort}
              onChange={(e) => handleSortChange(e.target.value)}
              className={styles.sortSelect}
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Content */}
        <div
          id="filter-content"
          className={`${styles.filterContent} ${isExpanded ? styles.expanded : ''}`}
        >
          {/* Cuisine Filters */}
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Cuisine</h3>
            <div className={styles.filterOptions}>
              {cuisineFilters.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleCuisineToggle(option.id)}
                  className={`${styles.filterChip} ${selectedCuisines.includes(option.id) ? styles.active : ''}`}
                  aria-pressed={selectedCuisines.includes(option.id)}
                >
                  {option.label}
                  {option.count && (
                    <span className={styles.count}>({option.count})</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filters */}
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Price Range</h3>
            <div className={styles.filterOptions}>
              {priceFilters.map(option => (
                <button
                  key={option.id}
                  onClick={() => handlePriceToggle(option.id)}
                  className={`${styles.filterChip} ${selectedPrices.includes(option.id) ? styles.active : ''}`}
                  aria-pressed={selectedPrices.includes(option.id)}
                >
                  {option.label}
                  {option.count && (
                    <span className={styles.count}>({option.count})</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Dietary Filters */}
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Dietary</h3>
            <div className={styles.filterOptions}>
              {dietaryFilters.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleDietaryToggle(option.id)}
                  className={`${styles.filterChip} ${selectedDietary.includes(option.id) ? styles.active : ''}`}
                  aria-pressed={selectedDietary.includes(option.id)}
                >
                  {option.label}
                  {option.count && (
                    <span className={styles.count}>({option.count})</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className={styles.clearSection}>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
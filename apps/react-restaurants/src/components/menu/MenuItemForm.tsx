import React, { useState, useEffect } from 'react';
import type { MenuItem } from './MenuItemCard';
import styles from './MenuItemForm.module.scss';

interface MenuItemFormProps {
  item?: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: Omit<MenuItem, 'id' | 'stats'>) => void;
}

const CATEGORIES = [
  'Appetizers',
  'Main Courses',
  'Desserts',
  'Beverages',
  'Sides',
  'Salads',
  'Soups',
  'Specials'
];

const ALLERGENS = [
  'Gluten',
  'Dairy',
  'Nuts',
  'Eggs',
  'Shellfish',
  'Fish',
  'Soy',
  'Sesame'
];

export const MenuItemForm: React.FC<MenuItemFormProps> = ({
  item,
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: CATEGORIES[0],
    image: '',
    isAvailable: true,
    preparationTime: 15,
    allergens: [] as string[],
    nutritionInfo: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image || '',
        isAvailable: item.isAvailable,
        preparationTime: item.preparationTime,
        allergens: item.allergens || [],
        nutritionInfo: item.nutritionInfo || {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0
        }
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: CATEGORIES[0],
        image: '',
        isAvailable: true,
        preparationTime: 15,
        allergens: [],
        nutritionInfo: {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0
        }
      });
    }
    setErrors({});
  }, [item, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (formData.preparationTime <= 0) {
      newErrors.preparationTime = 'Preparation time must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | number | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleNutritionChange = (field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      nutritionInfo: {
        ...prev.nutritionInfo,
        [field]: value
      }
    }));
  };

  const toggleAllergen = (allergen: string) => {
    setFormData(prev => ({
      ...prev,
      allergens: prev.allergens.includes(allergen)
        ? prev.allergens.filter(a => a !== allergen)
        : [...prev.allergens, allergen]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleInputChange('image', result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={styles.menuItemForm}>
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>
            {item ? 'Edit Menu Item' : 'Add New Menu Item'}
          </h2>
          <p className={styles.formSubtitle}>
            {item ? 'Update the details below' : 'Fill in the details for your new menu item'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            {/* Basic Information */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <svg className={styles.sectionIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L8.107 10.5a.75.75 0 00-1.214 1.007l1.643 2.25a.75.75 0 001.214-.093l3.857-5.408z" clipRule="evenodd" />
                </svg>
                Basic Information
              </h3>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="name">Item Name *</label>
                <input
                  id="name"
                  type="text"
                  className={styles.formInput}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Margherita Pizza"
                />
                {errors.name && <div className={styles.errorMessage}>{errors.name}</div>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  className={styles.formTextarea}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your menu item..."
                />
                {errors.description && <div className={styles.errorMessage}>{errors.description}</div>}
              </div>
            </div>

            {/* Price and Category */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="price">Price *</label>
              <input
                id="price"
                type="number"
                step="0.01"
                className={styles.formInput}
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
              />
              {errors.price && <div className={styles.errorMessage}>{errors.price}</div>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="category">Category</label>
              <select
                id="category"
                className={styles.formSelect}
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
              >
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="preparationTime">Prep Time (minutes) *</label>
              <input
                id="preparationTime"
                type="number"
                className={styles.formInput}
                value={formData.preparationTime}
                onChange={(e) => handleInputChange('preparationTime', parseInt(e.target.value) || 0)}
                placeholder="15"
              />
              {errors.preparationTime && <div className={styles.errorMessage}>{errors.preparationTime}</div>}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="isAvailable"
                  className={styles.checkbox}
                  checked={formData.isAvailable}
                  onChange={(e) => handleInputChange('isAvailable', e.target.checked)}
                />
                <label className={styles.formLabel} htmlFor="isAvailable">Available for ordering</label>
              </div>
            </div>

            {/* Image Upload */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <svg className={styles.sectionIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-2.69l-2.22-2.219a.75.75 0 00-1.06 0l-1.91 1.909.47.47a.75.75 0 11-1.06 1.06L6.53 8.091a.75.75 0 00-1.06 0l-2.97 2.97zM12 7a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                </svg>
                Image
              </h3>

              <div className={styles.imageUpload}>
                <div className={styles.imagePreview}>
                  {formData.image ? (
                    <img src={formData.image} alt="Preview" />
                  ) : (
                    <span style={{ fontSize: '2rem', color: 'var(--text-muted)' }}>📸</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                  id="image-upload"
                />
                <label htmlFor="image-upload" className={styles.uploadButton}>
                  {formData.image ? 'Change Image' : 'Upload Image'}
                </label>
              </div>
            </div>

            {/* Allergens */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <svg className={styles.sectionIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                </svg>
                Allergens
              </h3>

              <div className={styles.allergenTags}>
                {ALLERGENS.map(allergen => (
                  <button
                    key={allergen}
                    type="button"
                    className={`${styles.allergenTag} ${formData.allergens.includes(allergen) ? styles['allergenTag--selected'] : ''}`}
                    onClick={() => toggleAllergen(allergen)}
                  >
                    {allergen}
                  </button>
                ))}
              </div>
            </div>

            {/* Nutrition Information */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <svg className={styles.sectionIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                </svg>
                Nutrition Information (Optional)
              </h3>

              <div className={styles.nutritionGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="calories">Calories</label>
                  <input
                    id="calories"
                    type="number"
                    className={styles.formInput}
                    value={formData.nutritionInfo.calories}
                    onChange={(e) => handleNutritionChange('calories', parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="protein">Protein (g)</label>
                  <input
                    id="protein"
                    type="number"
                    className={styles.formInput}
                    value={formData.nutritionInfo.protein}
                    onChange={(e) => handleNutritionChange('protein', parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="carbs">Carbs (g)</label>
                  <input
                    id="carbs"
                    type="number"
                    className={styles.formInput}
                    value={formData.nutritionInfo.carbs}
                    onChange={(e) => handleNutritionChange('carbs', parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="fat">Fat (g)</label>
                  <input
                    id="fat"
                    type="number"
                    className={styles.formInput}
                    value={formData.nutritionInfo.fat}
                    onChange={(e) => handleNutritionChange('fat', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={`${styles.actionButton} ${styles['actionButton--secondary']}`}
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${styles.actionButton} ${styles['actionButton--primary']}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : (item ? 'Update Item' : 'Add Item')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
import React, { useState, useRef } from 'react';
import { Button } from '../ui/Button';
import styles from './ProfileHeader.module.scss';

interface ProfileHeaderProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
    memberSince: string;
    lastLogin: string;
  };
  onAvatarChange: (file: File) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  onAvatarChange
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      await onAvatarChange(file);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Failed to upload avatar. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={styles.profileHeader}>
      <div className={styles.avatarSection}>
        <div className={styles.avatarContainer}>
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={`${user.name}'s avatar`}
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              {getInitials(user.name)}
            </div>
          )}
          <button
            className={styles.avatarUpload}
            onClick={handleAvatarClick}
            disabled={isUploading}
            title="Change profile picture"
          >
            {isUploading ? (
              <span className={styles.uploadingIcon}>⟳</span>
            ) : (
              <svg className={styles.cameraIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2h-2.236a1 1 0 01-.894-.553L11.382 1H8.618L7.13 2.447A1 1 0 016.236 3H4zm6 5a3 3 0 100 6 3 3 0 000-6z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.hiddenFileInput}
        />
      </div>

      <div className={styles.userInfo}>
        <h1 className={styles.userName}>{user.name}</h1>
        <p className={styles.userEmail}>{user.email}</p>
        <div className={styles.userMeta}>
          <span className={styles.userRole}>{user.role}</span>
          <span className={styles.metaSeparator}>•</span>
          <span className={styles.memberSince}>Member since {user.memberSince}</span>
        </div>
      </div>

      <div className={styles.headerStats}>
        <div className={styles.statItem}>
          <div className={styles.statValue}>Active</div>
          <div className={styles.statLabel}>Status</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{user.lastLogin}</div>
          <div className={styles.statLabel}>Last Login</div>
        </div>
      </div>

      <div className={styles.headerActions}>
        <Button variant="outline" size="sm">
          Download Data
        </Button>
        <Button variant="primary" size="sm">
          Edit Profile
        </Button>
      </div>
    </div>
  );
};
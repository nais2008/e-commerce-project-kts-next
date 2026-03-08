import React from "react"
import Skeleton from "react-loading-skeleton"

import styles from "./ProfileSkeleton.module.scss"

const ProfileSkeleton: React.FC = () => {
  return (
    <div className={styles.skeleton}>
      <header className={styles.skeleton__header}>
        <Skeleton circle width={140} height={140} />

        <div className={styles.skeleton__userInfo}>
          <Skeleton width={220} height={18} />
          <Skeleton width={260} height={16} />
        </div>

        <div className={styles.skeleton__status}>
          <Skeleton width={90} height={28} borderRadius={30} />
        </div>
      </header>

      <div className={styles.skeleton__main}>
        <div>
          <Skeleton width={120} height={20} />
          <Skeleton className={styles.skeleton__card} />
          <Skeleton className={styles.skeleton__card} />
        </div>

        <div>
          <Skeleton width={100} height={20} />
          <Skeleton className={styles.skeleton__card} />
        </div>
      </div>
    </div>
  )
}

export default ProfileSkeleton

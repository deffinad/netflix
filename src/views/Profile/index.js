import React, { useEffect } from 'react'
import styles from './Profile.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import useProfile from '@/hooks/profile'
import { useRouter } from 'next/router'

const ProfileView = ({ data }) => {
  const { profile, setValueProfile, removeProfile } = useProfile()
  const router = useRouter()

  const handleNavigate = (item) => {
    setValueProfile(item)
    router.push('/browse')
  }

  useEffect(() => {
    removeProfile()
  }, [])

  return (
    <section className={styles.content}>
      <p className={styles.content_title}>Siapa yang menonton?</p>

      <div className={styles.content_profile}>
        {(data && data.map((item, index) => (
          <div onClick={() => handleNavigate(item)} key={index} className={styles.content_profile_item}>
            <div className={styles.content_profile_item_img}>
              <Image src={item.image} alt={item.title} fill priority/>
            </div>
            <p className={styles.content_profile_item_title}>{item.title}</p>
          </div>
        )))}
      </div>
    </section>
  )
}

export default ProfileView
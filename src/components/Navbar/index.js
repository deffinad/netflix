import React, { useEffect, useState } from 'react'
import styles from './Navbar.module.scss'
import useProfile from '@/hooks/profile'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { NotificationsOutlined, Search } from '@mui/icons-material'

const dataNotif = [
    {
        id: 1,
        message: 'Happy birthday sayang!',
        from: 'Deffin',
        date: '15 Maret 2025'
    },
    {
        id: 2,
        message: 'Cepet-cepet nikah sama orang pilihan sarah',
        from: 'Farsha',
        date: '15 Maret 2025'
    },
    {
        id: 3,
        message: 'Semoga cepet halal sama deffin',
        from: 'Vieska',
        date: '15 Maret 2025'
    },
    {
        id: 4,
        message: 'Jangan bikin gue emosi mulu, jangan jadi tua yang menyebalkan',
        from: 'Salma',
        date: '15 Maret 2025'
    },
    {
        id: 5,
        message: 'Tolong, pinternya agak ditambah',
        from: 'Arlez',
        date: '15 Maret 2025'
    },
    {
        id: 6,
        message: 'Semoga yang kamu mau bisa tersegerakan',
        from: 'Mayra',
        date: '15 Maret 2025'
    },
]

const Navbar = ({ iVisible = false }) => {
    const { profile } = useProfile()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isOpenNotification, setIsOpenNotification] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50); // Change threshold as needed
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {
                iVisible && (
                    <motion.nav
                        initial={{ y: -10, backgroundColor: "rgba(0, 0, 0, 0)" }}
                        animate={{ y: 0, backgroundColor: isScrolled ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0)" }}
                        exit={{ y: -10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={styles.navbar}
                    >
                        <div className={styles.navbar_header}>
                            <div className={styles.navbar_header_img}>
                                <Image src={'/images/Netflix_Logo.png'} alt='Netflix Logo' width={100} height={30} />
                            </div>

                            <div className={styles.navbar_header_menu}>
                                <ul>
                                    <li>
                                        <Link href={''}>
                                            Beranda
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={''}>
                                            Acara TV
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={''}>
                                            Film
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={''}>
                                            Baru & Populer
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={''}>
                                            Daftar Saya
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={''}>
                                            Telusuri menurut Bahasa
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.navbar_action}>
                            <Search />

                            <div
                                className={styles.navbar_action_notif}
                                onMouseEnter={() => setIsOpenNotification(true)}
                                onMouseLeave={() => setIsOpenNotification(false)}
                            >
                                <div className={styles.navbar_action_notif_badge}></div>

                                <NotificationsOutlined />

                                {isOpenNotification && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className={styles.navbar_action_notif_dropdown}
                                    >
                                        {dataNotif.map((item, index) => (
                                            <div key={item.id}>
                                                <div className={styles.navbar_action_notif_dropdown_item}>
                                                    <span className={styles.navbar_action_notif_dropdown_item_message}>{item.message}</span>
                                                    <span className={styles.navbar_action_notif_dropdown_item_fromDate}>{item.from} &#9679; {item.date}</span>
                                                </div>

                                                {index < dataNotif.length - 1 && (
                                                    <div className={styles.navbar_action_notif_dropdown_divider}></div>
                                                )}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </div>

                            <div className={styles.navbar_action_profile}>
                                {
                                    profile !== null && (
                                        <Image alt='profile' src={profile?.image} width={35} height={35} />
                                    )
                                }
                            </div>
                        </div>
                    </motion.nav>
                )
            }
        </AnimatePresence>
    )
}

export default Navbar
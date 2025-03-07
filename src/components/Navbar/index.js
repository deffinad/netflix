import React, { useEffect, useState } from 'react'
import styles from './Navbar.module.scss'
import useProfile from '@/hooks/profile'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { NotificationsOutlined, Search } from '@mui/icons-material'

const Navbar = ({ iVisible = false }) => {
    const { profile } = useProfile()
    const [isScrolled, setIsScrolled] = useState(false)

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
                                <Image src={'/images/Netflix_Logo.png'} alt='Netflix Logo' width={120} height={60} />
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
                            <NotificationsOutlined />
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
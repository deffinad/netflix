import React from 'react'
import { motion } from 'framer-motion'
import styles from './CardHover.module.scss'
import { useRouter } from 'next/router'
import { Add, KeyboardArrowDown, PlayArrow, ThumbUpAlt } from '@mui/icons-material'
import Image from 'next/image'

const CardHover = ({ item, type }) => {
    const router = useRouter()

    const handleRenderGenre = (genre) => {
        let tmpGenre = genre.split(',')
        return (
            tmpGenre.map((item, index) => (
                <div key={index} className={styles.wrapper_description_container3}>
                    <span>{item}</span>
                    {index < tmpGenre.length - 1 && (
                        <span>&#9679;</span>
                    )}
                </div>
            ))
        )
    }

    return (
        <motion.div
            initial={{ scale: type === 'popular' ? 0 : 1 }}
            animate={{ scale: 1.3 }}
            exit={{ scale: 1, transition: { duration: 0.3 } }}
            transition={{ duration: 0.5, delay: 0.5 }}
            layoutId={`card-modal-${item.id}`}
            className={styles.wrapper}
        >
            <div
                className={styles.wrapper_thumbnail}
                onClick={() => {
                    if (item.video !== '') {
                        router.push(`/watch/${item?.id}`)
                    }
                }}
            >
                <Image
                    src={`/images/${type}/${item.thumbnail}`}
                    alt={item.title}
                    fill
                    priority
                    className={styles.wrapper_thumbnail_image}
                />

                {item.video === '' && (
                    <div className={styles.wrapper_thumbnail_comingSoon}>
                        <span>Coming Soon</span>
                    </div>
                )}
            </div>

            <motion.div
                className={styles.wrapper_description}
                transition={{ duration: 0.3, delay: 0.5 }}
            >
                <div className={styles.wrapper_description_action}>
                    <div className={styles.wrapper_description_action_content1}>
                        <div
                            className='action play'
                            onClick={() => {
                                if (item.video !== '') {
                                    router.push(`/watch/${item.id}`)
                                }
                            }}
                        >
                            <PlayArrow />
                        </div>

                        <div className='action add'>
                            <Add />
                        </div>

                        <div className='action like'>
                            <ThumbUpAlt fontSize='14px' />
                        </div>
                    </div>

                    <div className={styles.wrapper_description_action_content1}>
                        <div
                            onClick={(e) => {
                                e.stopPropagation()
                                router.push({
                                    pathname: '/browse',
                                    query: { jbv: item.id },
                                }, undefined, { scroll: false })
                            }}
                            className='action detail'
                        >
                            <KeyboardArrowDown />
                        </div>
                    </div>
                </div>

                <div className={styles.wrapper_description_container2}>
                    <span className={styles.wrapper_description_container2_umur}>{item.age_rating}</span>
                    <span className={styles.wrapper_description_container2_durasi}>{item.title}</span>
                    <span className={styles.wrapper_description_container2_kualitas}>HD</span>
                </div>

                <div className={styles.wrapper_description_container3}>
                    {handleRenderGenre(item.genre)}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default CardHover
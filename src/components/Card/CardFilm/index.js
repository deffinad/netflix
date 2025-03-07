import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CardHover from '../CardHover'
import styles from './CardFilm.module.scss'
import Image from 'next/image'

const CardFilm = ({ key, item, type }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div style={{ paddingRight: 16 }} key={key}>
            <motion.div
                key={key}
                initial={'visible'}
                className={styles.wrapper}
                onMouseEnter={() => setHoveredIndex(item.id)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                    marginLeft: 48,
                    marginRight: 48
                }}
            >
                <Image
                    src={`/images/${type}/${item.thumbnail}`}
                    alt={item.title}
                    fill
                    className={styles.wrapper_image}
                />

                <AnimatePresence>
                    {hoveredIndex === item.id && (
                        <CardHover item={item} type={type} />
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

export default CardFilm
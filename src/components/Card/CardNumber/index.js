import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CardHover from '../CardHover'
import styles from './CardNumber.module.scss'
import Image from 'next/image'

const CardNumber = ({ key, index, item }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
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
            <span className={styles.wrapper_number}>{index}</span>
            <div
                className={styles.wrapper_image}
                style={{ backgroundImage: `url(/images/popular/${item.thumbnail})` }}
            >
            </div>

            <AnimatePresence>
                {hoveredIndex === item.id && (
                    <CardHover item={item} type={'popular'} />
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default CardNumber
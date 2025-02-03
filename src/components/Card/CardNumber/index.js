import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CardHover from '../CardHover'
import styles from './CardNumber.module.scss'

const CardNumber = ({ key, item }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <motion.div
            key={key}
            initial={'visible'}
            className={styles.wrapper}
            onMouseEnter={() => setHoveredIndex(key)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
                marginLeft: 48,
                marginRight: 48
            }}
        >
            <span className={styles.wrapper_number}>{item}</span>
            <div className={styles.wrapper_image}></div>

            <AnimatePresence>
                {hoveredIndex === key && (
                    <CardHover item={item} type={'number'}/>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default CardNumber
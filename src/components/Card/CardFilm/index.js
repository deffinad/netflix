import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CardHover from '../CardHover'
import styles from './CardFilm.module.scss'

const CardFilm = ({ key, item }) => {
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

            <AnimatePresence>
                {hoveredIndex === key && (
                    <CardHover item={item} type={'film'}/>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default CardFilm
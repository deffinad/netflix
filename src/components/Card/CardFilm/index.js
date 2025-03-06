import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CardHover from '../CardHover'
import styles from './CardFilm.module.scss'

const CardFilm = ({ key, item, type }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div style={{ paddingRight: 16 }}>
            <motion.div
                key={key}
                initial={'visible'}
                className={styles.wrapper}
                onMouseEnter={() => setHoveredIndex(item.id)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                    backgroundImage: `url(/images/${type}/${item.thumbnail})`,
                    marginLeft: 48,
                    marginRight: 48
                }}
            >

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
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './CardHover.module.scss'
import { useRouter } from 'next/router'
import VideoJS from '@/components/VideoJS'
import { Add, KeyboardArrowDown, PlayArrow, ThumbUpAlt } from '@mui/icons-material'

const CardHover = ({ item, type }) => {
    const router = useRouter()
    const playerRef = React.useRef(null);
    const [renderVideo, setRenderVideo] = useState(false)

    const videoJsOptions = {
        autoplay: true,
        controls: false,
        responsive: true,
        fluid: true,
        sources: [{
            src: 'https://www.w3schools.com/html/mov_bbb.mp4',
            type: 'video/mp4'
        }]
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on('waiting', () => {
            console.log('player is waiting');
        });

        player.on('dispose', () => {
            console.log('player will dispose');
        });

        player.on("play", () => {
            console.log("Video started!");
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setRenderVideo(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ scale: type === 'number' ? 0 : 1 }}
            animate={{ scale: 1.3 }}
            exit={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            layoutId={`card-modal-${item}`}
            className={styles.wrapper}
        >
            <div
                className={styles.wrapper_thumbnail}
                onClick={() => {
                    router.push('/watch')
                }}
            >
                {/* <VideoJS options={videoJsOptions} onReady={handlePlayerReady} /> */}
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
                                router.push('/watch')
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
                                    query: { jbv: item },
                                }, undefined, { scroll: false })
                            }}
                            className='action detail'
                        >
                            <KeyboardArrowDown />
                        </div>
                    </div>
                </div>

                <div className={styles.wrapper_description_container2}>
                    <span className={styles.wrapper_description_container2_umur}>13+</span>
                    <span className={styles.wrapper_description_container2_durasi}>Kekerasan</span>
                    <span className={styles.wrapper_description_container2_kualitas}>HD</span>
                </div>

                <div className={styles.wrapper_description_container3}>
                    <span>Romantis</span>
                    <span>&#9679;</span>
                    <span>Drama</span>
                    <span>&#9679;</span>
                    <span>Cinta</span>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default CardHover
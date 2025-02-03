import React, { useState } from 'react'
import styles from './Browse.module.scss'
import Navbar from '@/components/Navbar'
import CardFilm from '@/components/Card/CardFilm'
import CardNumber from '@/components/Card/CardNumber'
import Modal from '@/components/Modal'
import { AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import VideoJS from '@/components/VideoJS'
import CardHover from '@/components/Card/CardHover'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { InfoOutlined, PlayArrow } from '@mui/icons-material'
import { motion } from 'framer-motion'

const BrowseView = () => {
    const params = useSearchParams()
    const jbv = params.get('jbv')
    const router = useRouter()
    const playerRef = React.useRef(null);

    const settings = {
        dots: false,
        infinite: false,
        swipe: false,
        slidesToScroll: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6
    };

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

    return (
        <>
            <section className={styles.content}>
                <Navbar iVisible={jbv === null ? true : false} />

                <div className={styles.content_header}>
                    <motion.div
                        className={styles.content_header_thumbnail}
                        layoutId={`card-modal-0`}
                    >
                        {/* <VideoJS options={videoJsOptions} onReady={handlePlayerReady} /> */}
                    </motion.div>

                    <div className={styles.content_header_wrapper}>
                        <div className={styles.content_header_wrapper_title}>
                            <h1>Lorem ipsum dolor sit amet</h1>
                        </div>

                        <div className={styles.content_header_wrapper_description}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                        </div>

                        <div className={styles.content_header_wrapper_action}>
                            <div
                                className='btn play'
                                onClick={() => {
                                    router.push('/watch')
                                }}
                            >
                                <PlayArrow />
                                <span>Putar</span>
                            </div>
                            <motion.div
                                className='btn'
                                onClick={() => {
                                    router.push({
                                        pathname: '/browse',
                                        query: { jbv: 0 },
                                    }, undefined, { scroll: false })
                                }}
                            >
                                <InfoOutlined />
                                <span>Selengkapnya</span>
                            </motion.div>
                        </div>
                    </div>

                    <div className={styles.content_header_popular}>
                        <p className={styles.title}>10 Acara TV Teratas di Indonesia Hari Ini</p>

                        <div className={styles.content_header_popular_items}>
                            <div className="slider-container">
                                <Slider {...settings}>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                                        <CardNumber key={index} item={item} />
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={styles.content_main}
                    style={{
                        zIndex: 8
                    }}
                >
                    <div className={styles.content_main_new}>
                        <p className={styles.title}>Baru di Netflix</p>

                        <div className={styles.content_main_new_items}>
                            <div className="slider-container">
                                <Slider {...settings}>
                                    {[11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item, index) => (
                                        <CardFilm key={index} item={item} />
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={styles.content_main}
                    style={{
                        zIndex: 7
                    }}
                >
                    <div className={styles.content_main_new}>
                        <p className={styles.title}>Baru di Netflix</p>

                        <div className={styles.content_main_new_items}>
                            <div className="slider-container">
                                <Slider {...settings}>
                                    {[11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item, index) => (
                                        <CardFilm key={index} item={item} />
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <AnimatePresence>
                <Modal
                    open={jbv !== null ? true : false}
                    handleCloseModal={() => router.back()}
                    item={jbv}
                />
            </AnimatePresence>

        </>
    )
}

export default BrowseView
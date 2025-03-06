import React, { useEffect, useState } from 'react'
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
import { InfoOutlined, NavigateBefore, NavigateNext, PlayArrow } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { BASE_URL } from '@/contants/AppEnums'
import Footer from '@/components/Footer'

const BrowseView = ({ movies }) => {
    const params = useSearchParams()
    const jbv = params.get('jbv')
    const router = useRouter()
    const playerRef = React.useRef(null);

    // Custom Prev Arrow
    const PrevArrow = ({ onClick }) => (
        <div
            className="custom-arrow prev"
            onClick={onClick}
        >
            <NavigateBefore sx={{ fontSize: 40 }} />
        </div>
    );

    // Custom Next Arrow
    const NextArrow = ({ onClick }) => (
        <div
            className="custom-arrow next"
            onClick={onClick}
        >
            <NavigateNext sx={{ fontSize: 40 }} />
        </div>
    );

    const settings = {
        // dots: true,
        infinite: false,
        swipe: false,
        slidesToScroll: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 1200, // Large screens (e.g. desktops)
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 992, // Medium screens (e.g. tablets)
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 768, // Small screens (e.g. mobile landscape)
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480, // Extra small screens (e.g. mobile portrait)
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ],
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        customPaging: (i) => (
            <div className="custom-dot"></div>
        ),
        appendDots: (dots) => (
            <div style={{
                position: "absolute",
                top: -24,
                right: 16,
                width: "auto !important",
                bottom: "auto !important"
            }}>
                <ul className="custom-dots">{dots}</ul>
            </div>
        ),
    };

    const videoJsOptions = {
        autoplay: true,
        controls: false,
        responsive: true,
        fluid: true,
        sources: [{
            src: movies.home.trailer,
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
        if (jbv !== null) {
            if (playerRef.current) {
                playerRef.current.pause();
            }
        } else {
            if (playerRef.current) {
                playerRef.current.play();
            }
        }
    }, [jbv])

    return (
        <>
            <section className={styles.content}>
                <Navbar iVisible={jbv === null ? true : false} />

                <div className={styles.content_header}>
                    <motion.div
                        className={styles.content_header_thumbnail}
                        layoutId={`card-modal-${movies.home.id}`}
                    >
                        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                    </motion.div>

                    <div className={styles.content_header_wrapper}>
                        <div className={styles.content_header_wrapper_title}>
                            <h1>{movies.home.title}</h1>
                            <p className={styles.content_header_wrapper_title_description}>{movies.home.description}</p>
                        </div>

                        <div className={styles.content_header_wrapper_action}>
                            <div
                                className='btn play'
                                onClick={() => {
                                    router.push(`/watch/${movies.home.id}`)
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
                                        query: { jbv: movies.home.id },
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
                                    {movies.popular.map((item, index) => (
                                        <CardNumber key={index} index={index + 1} item={item} />
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
                        <p className={styles.title}>Trending di Netflix</p>

                        <div className={styles.content_main_new_items}>
                            <div className="slider-container">
                                <Slider {...settings}>
                                    {movies.trending.map((item, index) => (
                                        <CardFilm key={index} item={item} type={'trending'} />
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
                                    {movies.new.map((item, index) => (
                                        <CardFilm key={index} item={item} type={'new'} />
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
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
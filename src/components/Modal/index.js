import React, { useEffect, useState } from 'react'
import styles from './Modal.module.scss'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import VideoJS from '../VideoJS'
import { Close } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { BASE_URL } from '@/contants/AppEnums'

const Modal = ({ open, handleCloseModal, item }) => {
    const playerRef = React.useRef(null);
    const router = useRouter()
    const [detailMovie, setDetailMovie] = useState(null)

    const videoJsOptions = {
        autoplay: true,
        controls: false,
        responsive: true,
        fluid: true,
        // sources: [{
        //     src: 'https://www.w3schools.com/html/mov_bbb.mp4',
        //     type: 'video/mp4'
        // }]
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
        if (open) {
            fetch(BASE_URL + 'api/movie/' + item)
                .then(res => res.json())
                .then(response => setDetailMovie(response.data))
        } else {
            setDetailMovie(null)
        }
    }, [open])

    const handleGetFolderImage = (fileName) => {
        if (fileName) {
            if (fileName.includes('popular')) {
                return 'popular'
            } else if (fileName.includes('new')) {
                return 'new'
            } else if (fileName.includes('trending')) {
                return 'trending'
            }
        } else {
            return ''
        }
    }

    if (!open) {
        return <></>
    }

    return (
        <div
            onClick={handleCloseModal}
            className={styles.wrapper}
        >
            <motion.div
                className={styles.wrapper_content}
                layoutId={`card-modal-${item}`}
                // initial={{ scale: 0 }}
                // animate={{ scale: 1 }}
                // exit={{ scale: 0 }}
                onClick={(e) => {
                    e.stopPropagation()
                }}
            >
                <div
                    className={styles.wrapper_content_btn_close}
                    onClick={handleCloseModal}
                >
                    <Close />
                </div>

                <div
                    className={styles.wrapper_content_header}
                    style={{ backgroundImage: `url(/images/${handleGetFolderImage(detailMovie?.thumbnail)}/${detailMovie?.thumbnail})` }}
                    onClick={() => {
                        if (detailMovie?.video !== '') {
                            router.push(`/watch/${detailMovie?.id}`)
                        }
                    }}
                >
                    {
                        detailMovie?.video !== '' && (
                            <VideoJS
                                options={{
                                    ...videoJsOptions, sources: [{
                                        src: detailMovie?.trailer,
                                        type: 'video/mp4'
                                    }]
                                }}
                                onReady={handlePlayerReady}
                            />
                        )
                    }
                    <div className={styles.wrapper_content_header_gradient}></div>
                </div>

                <div
                    className={styles.wrapper_content_body}
                >
                    <div className={styles.wrapper_content_body_description}>
                        <div className={styles.wrapper_content_body_description_container_1}>
                            <div className={styles.wrapper_content_body_description_container_1_sub}>
                                <div className={styles.wrapper_content_body_description_container_1_sub_durasi}>
                                    <span>{detailMovie?.year} {detailMovie?.duration}</span>
                                </div>

                                <div className={styles.wrapper_content_body_description_container_1_sub_kategori}>
                                    <span className={styles.wrapper_content_body_description_container_1_sub_kategori_umur}>{detailMovie?.age_rating}</span>
                                    <span className={styles.wrapper_content_body_description_container_1_sub_kategori_title}>{detailMovie?.genre.split(',')[0]}</span>
                                </div>
                            </div>

                            <div className={styles.wrapper_content_body_description_container_1_narasi}>
                                <p className={styles.wrapper_content_body_description_container_1_narasi_title}>{detailMovie?.title}</p>
                                <p className={styles.wrapper_content_body_description_container_1_narasi_subTitle}>{detailMovie?.synopsis}</p>
                            </div>
                        </div>

                        <div className={styles.wrapper_content_body_description_container_2}>
                            <div className={styles.wrapper_content_body_description_container_2_pemeran}>
                                <span className={styles.title}>Pemeran  </span>
                                <span className={styles.value}>{detailMovie?.cast}</span>
                            </div>
                            <div className={styles.wrapper_content_body_description_container_2_genre}>
                                <span className={styles.title}>Genre  </span>
                                <span className={styles.value}>{detailMovie?.genre}</span>
                            </div>
                            {/* <div className={styles.wrapper_content_body_description_container_2_film}>
                                <span className={styles.title}>Film ini  </span>
                                <span className={styles.value}>Film ini</span>
                            </div> */}
                        </div>
                    </div>

                    {detailMovie?.sameMovie && (
                        <div className={styles.wrapper_content_body_lainnya}>
                            <h2>Lainnya Seperti Ini</h2>
                        </div>
                    )}

                    <div className={styles.wrapper_content_body_tentang}>
                        <h2>Tentang Film Ini</h2>

                        <div className={styles.wrapper_content_body_tentang_container}>
                            <div>
                                <span className={styles.title}>Sutradara</span>
                                <span className={styles.value}>{detailMovie?.director}</span>
                            </div>

                            <div>
                                <span className={styles.title}>Pemeran</span>
                                <span className={styles.value}>{detailMovie?.cast}</span>
                            </div>

                            <div>
                                <span className={styles.title}>Penulis</span>
                                <span className={styles.value}>{detailMovie?.write}</span>
                            </div>

                            <div>
                                <span className={styles.title}>Genre</span>
                                <span className={styles.value}>{detailMovie?.genre}</span>
                            </div>

                            {/* <div>
                                <span className={styles.title}>Film ini</span>
                                <span className={styles.value}>Film ini</span>
                            </div> */}

                            <div>
                                <span className={styles.title}>Rating usia</span>
                                <span className={styles.value}>{detailMovie?.age_rating}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div >
        </div >
    )
}

export default Modal
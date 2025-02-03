import React from 'react'
import styles from './Modal.module.scss'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import VideoJS from '../VideoJS'
import { Close } from '@mui/icons-material'
import { useRouter } from 'next/router'

const Modal = ({ open, handleCloseModal, item }) => {
    const playerRef = React.useRef(null);
    const router = useRouter()

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
                    onClick={() => {
                        router.push('/watch')
                    }}
                >
                    <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                    <div className={styles.wrapper_content_header_gradient}></div>
                </div>

                <div
                    className={styles.wrapper_content_body}
                >
                    <div className={styles.wrapper_content_body_description}>
                        <div className={styles.wrapper_content_body_description_container_1}>
                            <div className={styles.wrapper_content_body_description_container_1_sub}>
                                <div className={styles.wrapper_content_body_description_container_1_sub_durasi}>
                                    <span>2024 2j 2m</span>
                                </div>

                                <div className={styles.wrapper_content_body_description_container_1_sub_kategori}>
                                    <span className={styles.wrapper_content_body_description_container_1_sub_kategori_umur}>13+</span>
                                    <span className={styles.wrapper_content_body_description_container_1_sub_kategori_title}>Kekerasan</span>
                                </div>
                            </div>

                            <div className={styles.wrapper_content_body_description_container_1_narasi}>
                                <p className={styles.wrapper_content_body_description_container_1_narasi_title}>Film No.1 Hari Ini</p>
                                <p className={styles.wrapper_content_body_description_container_1_narasi_subTitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            </div>
                        </div>

                        <div className={styles.wrapper_content_body_description_container_2}>
                            <div className={styles.wrapper_content_body_description_container_2_pemeran}>
                                <span className={styles.title}>Pemeran  </span>
                                <span className={styles.value}>Sarah Shafa Adzkiya, Deffin Achmaddifa</span>
                            </div>
                            <div className={styles.wrapper_content_body_description_container_2_genre}>
                                <span className={styles.title}>Genre  </span>
                                <span className={styles.value}>Romantis</span>
                            </div>
                            <div className={styles.wrapper_content_body_description_container_2_film}>
                                <span className={styles.title}>Film ini  </span>
                                <span className={styles.value}>Film ini</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.wrapper_content_body_lainnya}>
                        <h2>Lainnya Seperti Ini</h2>
                    </div>

                    <div className={styles.wrapper_content_body_tentang}>
                        <h2>Tentang Film Ini</h2>

                        <div className={styles.wrapper_content_body_tentang_container}>
                            <div>
                                <span className={styles.title}>Sutradara</span>
                                <span className={styles.value}>Sutradara</span>
                            </div>

                            <div>
                                <span className={styles.title}>Pemeran</span>
                                <span className={styles.value}>Pemeran</span>
                            </div>

                            <div>
                                <span className={styles.title}>Penulis</span>
                                <span className={styles.value}>Penulis</span>
                            </div>

                            <div>
                                <span className={styles.title}>Genre</span>
                                <span className={styles.value}>Genre</span>
                            </div>

                            <div>
                                <span className={styles.title}>Film ini</span>
                                <span className={styles.value}>Film ini</span>
                            </div>

                            <div>
                                <span className={styles.title}>Rating usia</span>
                                <span className={styles.value}>Rating usia</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Modal
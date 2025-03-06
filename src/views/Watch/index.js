import React, { useRef } from 'react'
import styles from './Watch.module.scss'
import { useRouter } from 'next/router';
import VideoJS from '@/components/VideoJS';

const WatchView = ({ movie }) => {
    const router = useRouter()
    const playerRef = useRef(null);

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: false,
        fluid: true,
        sources: [{
            src: movie.video,
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
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    )
}

export default WatchView
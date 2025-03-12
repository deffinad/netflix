import React, { useRef } from 'react'
import styles from './Watch.module.scss'
import VideoJS from '@/components/VideoJS';
import { BASE_URL } from '@/contants/AppEnums';

const WatchView = ({ movie }) => {
    const playerRef = useRef(null);

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        // sources: [{
        //     src: movie.video,
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

    return (
        <div className={styles.wrapper}>
            <VideoJS
                options={{
                    ...videoJsOptions, sources: [{
                        src: movie.video,
                        type: 'video/mp4'
                    }]
                }}
                onReady={handlePlayerReady}
            />
        </div>
    )
}

export default WatchView
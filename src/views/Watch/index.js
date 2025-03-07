import React, { useEffect, useRef, useState } from 'react'
import styles from './Watch.module.scss'
import { useRouter } from 'next/router';
import VideoJS from '@/components/VideoJS';
import { BASE_URL } from '@/contants/AppEnums';

const WatchView = ({ movie }) => {
    const router = useRouter()
    const playerRef = useRef(null);
    const [video, setVideo] = useState(null)

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

    useEffect(() => {
        setVideo(null)
        fetch(BASE_URL + 'api/dropbox')
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                setVideo(url)
            });
    }, [movie])

    return (
        <div className={styles.wrapper}>
            {video !== null && (
                <VideoJS
                    options={{
                        ...videoJsOptions, sources: [{
                            src: movie.video,
                            type: 'video/mp4'
                        }]
                    }}
                    onReady={handlePlayerReady}
                />
            )}
        </div>
    )
}

export default WatchView
import React from 'react'
import styles from './Footer.module.scss'

const Footer = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapper_question}>
                <p>Questions? Call 085721350359</p>
            </div>

            <div className={styles.wrapper_content}>
                <div className={styles.wrapper_content_faq}>
                    <ul>
                        <li>FAQ</li>
                        <li>Investor Relations</li>
                        <li>Watch to Watch</li>
                        <li>Coorporate Information</li>
                        <li>Only on Netflix</li>
                    </ul>
                </div>

                <div className={styles.wrapper_content_helpCenter}>
                    <ul>
                        <li>Help Center</li>
                        <li>Jobs</li>
                        <li>Term of Use</li>
                        <li>Contact Us</li>
                    </ul>
                </div>

                <div className={styles.wrapper_content_account}>
                    <ul>
                        <li>Account</li>
                        <li>Redeem Gift Cards</li>
                        <li>Privacy</li>
                        <li>Speed Test</li>
                    </ul>
                </div>

                <div className={styles.wrapper_content_mediaCenter}>
                    <ul>
                        <li>Media Center</li>
                        <li>Buy Gift Cards</li>
                        <li>Cookies Preferences</li>
                        <li>Legal Notices</li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Footer
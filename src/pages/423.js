import React from 'react'

const LockedPage = () => {
    return (
        <div style={styles.container}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <h1 style={styles.errorCode}>423</h1>
                <div style={styles.divider}></div>
                <p style={styles.message}>You are accessing the website from a supported device (desktop recommended).</p>
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#000", // Black background
        color: "#fff", // White text
        fontFamily: "Arial, sans-serif",
        position: "relative",
        padding: '16px'
    },
    divider: {
        height: '50px',
        width: 1,
        backgroundColor: 'rgba(255,255,255,.3)'
    },
    errorCode: {
        display: "inline-block",
        margin: "0 20px 0 0",
        fontSize: "24px",
        fontWeight: 500,
        verticalAlign: "top",
    },
    message: {
        fontSize: "14px",
        margin: "0 0 0 20px",
        fontWeight: 400,
    },
};

export default LockedPage
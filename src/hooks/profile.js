import React, { useState } from 'react'

const useProfile = () => {
    const [profile, setProfile] = useState(() => {
        try {
            const item = window.sessionStorage.getItem('profile');
            return item !== null ? JSON.parse(item) : null;
        } catch (error) {
            return null;
        }
    });

    const setValueProfile = (value) => {
        try {
            const valueToStore =
                value instanceof Function ? value(profile) : value;
            setProfile(valueToStore);
            window.sessionStorage.setItem('profile', JSON.stringify(valueToStore));
        } catch (error) {
            console.error("Error setting sessionStorage key:", key, error);
        }
    };

    const removeProfile = () => {
        try {
            window.sessionStorage.removeItem('profile');
            setProfile(null);
        } catch (error) {
            console.error("Error removing sessionStorage key:", key, error);
        }
    };

    return { profile, setValueProfile, removeProfile };
}

export default useProfile
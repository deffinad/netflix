import { useState, useEffect } from "react";

const useProfile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        try {
            const item = window.sessionStorage.getItem("profile");
            setProfile(item ? JSON.parse(item) : null);
        } catch (error) {
            console.error("Error loading profile from sessionStorage:", error);
        }
    }, []);

    const setValueProfile = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(profile) : value;
            setProfile(valueToStore);
            window.sessionStorage.setItem("profile", JSON.stringify(valueToStore));

            document.cookie = "profile=true; path=/";
        } catch (error) {
            console.error("Error setting profile in sessionStorage:", error);
        }
    };

    const removeProfile = () => {
        try {
            window.sessionStorage.removeItem("profile");
            setProfile(null);

            document.cookie = "profile=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        } catch (error) {
            console.error("Error removing profile from sessionStorage:", error);
        }
    };

    return { profile, setValueProfile, removeProfile };
};

export default useProfile;

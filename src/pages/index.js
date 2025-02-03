import ProfileView from '@/views/Profile'
import React from 'react'

const ProfilePage = ({ data }) => {
    return (
        <ProfileView data={data} />
    )
}

export default ProfilePage

export async function getServerSideProps() {
    const data = [
        {
            id: 1,
            image: '/images/sarah_dewasa.JPG',
            title: 'Sarah',
        }, {
            id: 2,
            image: '/images/sarah_puber.JPEG',
            title: 'Shafa',
        },
        {
            id: 3,
            image: '/images/sarah_kecil.PNG',
            title: 'Adzkiya',
        },
    ]

    return { props: { data } }
}
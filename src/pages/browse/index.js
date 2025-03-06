import { BASE_URL } from '@/contants/AppEnums'
import BrowseView from '@/views/Browse'
import React, { useEffect, useState } from 'react'

const BrowsePage = ({ movies }) => {
    return (
        <BrowseView movies={movies} />
    )
}

export default BrowsePage

export async function getServerSideProps() {
    const res = await fetch(BASE_URL + 'api/movie')
    const response = await res.json()

    return { props: { movies: response.data } }
}
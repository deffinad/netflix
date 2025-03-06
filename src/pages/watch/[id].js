import { BASE_URL } from '@/contants/AppEnums'
import WatchView from '@/views/Watch'
import React from 'react'

const WatchPage = ({ movie }) => {
  return (
    <WatchView movie={movie}/>
  )
}

export default WatchPage

export async function getServerSideProps({ params }) {
  const res = await fetch(BASE_URL + 'api/movie/' + params.id)
  const response = await res.json()

  return { props: { movie: response.data } }
}
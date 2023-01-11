import React from "react";
import { useParams } from 'react-router-dom';

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Shinjuku',
    description: 'Neighbourhood in Tokyo',
    imageUrl: 'https://source.unsplash.com/4HG5hlhmZg8',
    address: '1-19-1, Kabukicho, Shinjuku-ku, Tokyo, 160-0021',
    location: {
      lat: '35.6952948',
      lng: '139.7008743'
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Shinjuku',
    description: 'Neighbourhood in Tokyo',
    imageUrl: 'https://source.unsplash.com/4HG5hlhmZg8',
    address: '1-19-1, Kabukicho, Shinjuku-ku, Tokyo, 160-0021',
    location: {
      lat: '35.6952948',
      lng: '139.7008743'
    },
    creator: 'u2'
  }
]

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)
  return (
    <PlaceList items={loadedPlaces} />
  )
}

export default UserPlaces;
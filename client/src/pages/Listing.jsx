import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Listing() {
    const data=useLocation()
    console.log(data.state)
  return (
    <div>Listing</div>
  )
}

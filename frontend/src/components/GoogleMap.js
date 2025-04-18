import React, { useState, useEffect } from 'react'
import Map from './Map'
import Loader from './Loader'
import Header from './header'

function GoogleMap() {
  const [eventData, setEventData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      const res = await fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events')
      const { events } = await res.json()
      setEventData(events) 
      setLoading(false)
    }

    fetchEvents()
  }, [])

  return (
    <div>
        <Header/>
      {!loading ? <Map eventData={eventData} /> : <Loader />}
    </div>
  )
}

export default GoogleMap

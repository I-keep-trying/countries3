import React, { useState, createRef, useRef, useEffect } from 'react'
import H from '@here/maps-api-for-javascript'

const Map = () => {
  const [map, setMap] = useState(null)

  //const mapRef = createRef()
  const mapUseRef = useRef()

  useEffect(() => {
    if (!map) {
      console.log('mapUseRef', mapUseRef)
      // instantiate a platform, default layers and a map as usual
      const platform = new H.service.Platform({
        apikey: process.env.REACT_APP_HERE_KEY,
      })
      const layers = platform.createDefaultLayers()
      console.log('layers', layers)
      const map = new H.Map(mapUseRef.current, layers.vector.normal.map, {
        pixelRatio: window.devicePixelRatio,
        center: { lat: 0, lng: 0 },
        zoom: 2,
      })
      console.log('map', map)
      //    this.map = map
    }
  }, [map])
  /*  if (!map) {
    console.log('mapUseRef', mapUseRef)
    // instantiate a platform, default layers and a map as usual
    const platform = new H.service.Platform({
      apikey: process.env.REACT_APP_HERE_KEY,
    })
    const layers = platform.createDefaultLayers()
    console.log('layers', layers)
    const map = new H.Map(mapUseRef.current, layers.vector.normal.map, {
      pixelRatio: window.devicePixelRatio,
      center: { lat: 0, lng: 0 },
      zoom: 2,
    })
    console.log('map', map)
    //    this.map = map
  } */

  return <div style={{ width: '300px', height: '300px' }} ref={mapUseRef} />
}

export default Map

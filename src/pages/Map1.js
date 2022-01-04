import React from 'react'
import H from '@here/maps-api-for-javascript'

export default class Map extends React.Component {
  constructor(props) {
    super(props)
    // the reference to the container
    this.ref = React.createRef()
    // reference to the map
    this.map = null
  }

  componentDidMount() {
    if (!this.map) {
      console.log('this.ref', this.ref) // {current: div}
      // instantiate a platform, default layers and a map as usual
      const platform = new H.service.Platform({
        apikey: process.env.REACT_APP_HERE_KEY,
      })
      const layers = platform.createDefaultLayers()
      console.log('layers', layers) // {vector: {…}, raster: {…}}
      const map = new H.Map(this.ref.current, layers.vector.normal.map, {
        pixelRatio: window.devicePixelRatio,
        center: { lat: 0, lng: 0 },
        zoom: 2,
      })
      // eslint-disable-next-line no-irregular-whitespace
      console.log('map', map) // T {Nd: false, sb: undefined, aa: pe, ao: T, jh: null,}
      this.map = map
    }
  }

  render() {
    return <div style={{ width: '300px', height: '300px' }} ref={this.ref} />
  }
}

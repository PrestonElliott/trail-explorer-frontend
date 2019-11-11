import { backend_api } from '../constants'
let dispatch;


export const getCoords = async (dispatch_ref) => {
    dispatch = dispatch_ref;

    if(navigator.geolocation)
        await navigator.geolocation.getCurrentPosition(fetchTrails, blocked);
    else
        dispatch({ type: 'SET_GEO_ERROR', geoError: 'Location services are not supported by your browser' })
}

const blocked = () => {
    dispatch({ type: 'SET_GEO_ERROR', geoError: 'Enable location permissions for this domain to see trails near you' })
    fetchTrails({ coords: { latitude:33.7490, longitude:-84.3880 }})
}

const fetchTrails = (position) => {
    const maxResults = 25

    const lat = position.coords.latitude.toString().replace('.', '!')
    const lon = position.coords.longitude.toString().replace('.', '!')

    fetch(`${backend_api}/trails&lat=${lat}&lon=${lon}&maxResults=${maxResults}`)
    .then(res => res.json())
    .then(res => dispatch({ type: 'SET_TRAILS', allTrails: res, lat, lon }))
    .catch(console.error)
}

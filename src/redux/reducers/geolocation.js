const initialState = {
    allTrails: [],
    lat: '33!74900',
    lon: '-84!388000',
    geoError: null
}

export default (state = initialState, action) => {
    switch (action.type) {

        case 'SET_COORDS': {
            return {...state, lat: action.lat, lon: action.lon }
        }

        case 'SET_GEO_ERROR': {
            return {...state, geoError: action.geoError }
        }

        case 'SET_TRAILS': {
            return {...state, allTrails: action.allTrails, lat: action.lat, lon: action.lon }
        }

        default: { return state }
    }
}

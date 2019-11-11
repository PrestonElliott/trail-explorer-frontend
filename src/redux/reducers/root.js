import { combineReducers } from 'redux'
import sessionReducer from './session'
import geoLocationReducer from './geolocation'
import navbarReducer from './navbar'

export default combineReducers({
	session: sessionReducer,
	location: geoLocationReducer,
	navbar: navbarReducer
})

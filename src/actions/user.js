import { backend_api } from '../constants'

export const getUserProfile = dispatch => {
	if(localStorage.jwt) {
		fetch(`${backend_api}/profile`, {
			headers: { Authorization: localStorage.jwt }
		})
		.then(res => res.json())
		.then(res => {
			if(res.user)
				dispatch({ type: 'SET_USER', user: res.user })
			else
				dispatch({ type: 'LOG_OUT' })
		})
	}
}

export const postNewTrip = (trip, trip_type, dispatch) => {
	return fetch(backend_api+'/'+trip_type, {
		method: 'POST',
		headers: {
			Authorization: localStorage.jwt,
			'Content-Type':'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({ trip })
	})
	.then(res => res.json())
	.then(res => {
		if(res.trip) {
			dispatch({ type: 'NEW_TRIP', trip: res.trip, trip_type })
		}
	})
}

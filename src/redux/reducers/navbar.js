const initialState = {
	navbarOpen: false
}

export default (state = initialState, action) => {
	switch (action.type) {

		case 'TOGGLE_NAVBAR': {
			return { navbarOpen: !state.navbarOpen }
		}

		case 'CLOSE_NAVBAR': {
			if(state.navbarOpen)
				return { navbarOpen: false }
			else
				return state
		}

		default: { return state }
	}
}

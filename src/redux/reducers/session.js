const initialState = {
    loggedIn: !!localStorage.jwt,
    user: {},
    allUsers: []
}

export default (state = initialState, action) => {
    switch (action.type) {

        case 'ALL_USERS':
            return {...state, allUsers: action.allUsers }

        case 'LOG_IN': {
            localStorage.setItem('jwt', action.jwt)
            return {...state, loggedIn: true, user: action.user }
        }

        case 'LOG_OUT': {
            localStorage.removeItem('jwt')
            return {...state, loggedIn: false, user: {} }
        }

        case 'SET_USER': {
            return {...state, user: action.user }
        }

        case 'FOLLOW_USER': {
            let userCopy = Object.assign({}, state.user);
            userCopy.followed_users[action.user.id] = action.user;

            return {...state, user: userCopy }
        }

        case 'NEW_TRIP': {
            let userCopy = Object.assign({}, state.user);
            userCopy[action.trip_type].push(action.trip);

            return {...state, user: userCopy }
        }

        default: { return state }
    }
}

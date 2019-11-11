import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// components
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Profile from "./components/Profile"
import EditProfile from './components/EditProfile'
import TripForm from "./components/TripForm"
import FollowerFeed from "./components/FollowerFeed"
import Trails from './components/Trails'
import FutureTripForm from "./components/FutureTripForm"
import AllUsers from "./components/AllUsers"
// actions
import { getCoords } from './actions/geolocation'
import { getUserProfile } from './actions/user'
import { closeNavbar } from './actions/navbar'
// assets
import './stylesheets/App.css'


class App extends React.Component {

    state = {
        navbarOpen: false
    }

    componentDidMount() {
        getUserProfile(this.props.dispatch);
        getCoords(this.props.dispatch);
    }

    getRoutes = () => {
        if(this.props.loggedIn) {
            return (
                <Switch>
                    <Route exact path='/trails' component={Trails} />
                    <Route exact path='/profile' component={Profile} />
                    <Route exact path="/trip-form" component={TripForm}/>
                    <Route exact path='/community' component={AllUsers} />
                    <Route exact path="/edit-profile" component={EditProfile} />
                    <Route exact path='/follower-feed' component={FollowerFeed} />
                    <Route exact path="/future-trip-form" component={FutureTripForm} />
                    <Redirect to='/profile' />
                </Switch>
            )
        }
        else {
            return (
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={SignUp} />
                    <Redirect to='/login' />
                </Switch>
            )
        }
    }

    render() {
        if(this.props.loggedIn && !this.props.user.id) return null

        return (
            <div className="App">
                <Navbar/>
                <div className='routes-container' onClick={() => closeNavbar(this.props.dispatch)}>
                    { this.getRoutes() }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.session.user,
    loggedIn: state.session.loggedIn
})
export default connect(mapStateToProps)(App)

import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import Trip from './Trip'
import FutureTrip from "./FutureTrip"
import {Row, Col} from 'react-bootstrap'

class FollowerFeed extends Component {

    state = {}

    mapFriendTrips = () => {
        const { followed_users } =this.props.user
        return Object.keys(followed_users).map(key => 
            followed_users[key].trips.map(trip => 
                <Col md={3} key={trip.id}><Trip trip={trip} /></Col>
            )
        )
    }

    mapFriendFutureTrips = () => {
        const { followed_users } =this.props.user
        return Object.keys(followed_users).map(key => 
            followed_users[key].future_trips.map(trip => 
                <Col md={3} key={trip.id}><FutureTrip key={trip.id} futureTrip={trip} /></Col>
            )
        )
    }

    render() {
        return (
            <Fragment>
                <br/><h2>Followed Users' Recent Trips</h2><br/>
                <div className='tripcard-div'>
                    <Row id="follower-row">
                        { this.mapFriendTrips() }
                    </Row>
                </div>
                <br/><h2>Followed Users' Future Trips</h2><br/>
                <div className='futuretripcard-div'>
                    <Row>
                        { this.mapFriendFutureTrips() }
                    </Row>
                </div><br/>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({ user: state.session.user })
export default connect(mapStateToProps)(FollowerFeed)

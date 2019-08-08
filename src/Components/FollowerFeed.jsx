import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import Trip from './Trip'
import FutureTrip from "./FutureTrip"
import {Row, Col} from 'react-bootstrap'

class FollowerFeed extends Component {

    render() {
        console.log(this.props.user.followed_users)
        return (
            <Fragment>
                <br/><h2>Your Followers Recent Trips!</h2><br/>
                <div className='tripcard-div'>
                    <Row id="follower-row">
                        {this.props.user.followed_users.map(friend => 
                            friend.trips.map(trip => 
                                <Col md={3}><Trip key={trip.id} trip={trip} /> </Col>))
                        }
                    </Row>
                </div>
                <br/><h2>Your Followers Future Trips!</h2><br/>
                <div className='futuretripcard-div'>
                    <Row>
                        {this.props.user.followed_users.map(friend => 
                            friend.future_trips.map(futureTrip => 
                                <Col md={3}><FutureTrip key={futureTrip.id} futureTrip={futureTrip}/> </Col>))
                        }
                    </Row>
                </div><br/>
            </Fragment>
        )
    }
}
let mapStateToProps = state => ({ user: state.userReducer.user })
export default connect(mapStateToProps)(FollowerFeed)
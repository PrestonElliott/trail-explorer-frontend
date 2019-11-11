import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import Iframe from 'react-iframe'
import { ButtonGroup, Button } from "react-bootstrap"
import FutureTripsContainer from "./FutureTripsContainer"
import TripCarousel from "./TripCarousel"

class Profile extends Component {

    render() {
        return (
            <div>
                <div className="user-profile">
                <br/><h2>Hey {this.props.user.name}!</h2><br/>

                <ButtonGroup aria-label="Basic example">
                    <Link to="/trip-form"> 
                        <Button variant="primary">Log Your Trip</Button>
                    </Link>

                    <Link to="/future-trip-form">
                        <Button variant="secondary">Create a Future Trip</Button>
                    </Link>

                    <Link to="/edit-profile">
                        <Button variant="primary">Edit Profile</Button>
                    </Link>
                </ButtonGroup>

                </div><br/><br/>

                <div align="center" id="featured-trail-map">
                    <h2>Featured Trail</h2><br/>
                    <Iframe title="trail-detail-map" className="trail-detail-map" frameborder="0" scrolling="no" 
                        src="https://www.hikingproject.com/widget?v=3&map=1&type=trail&id=0&x=-9401700&y=4014132&z=8">
                    </Iframe>
                </div><br/><br/>

                <div id="trip-carousel">
                    <TripCarousel/>
                </div><br/><br/>

                <div>
                    <h2>Future Trips</h2>
                    <FutureTripsContainer /><br/>
                </div><br/>
            </div>
        )
    }
}

let mapStateToProps = state => ({ user: state.session.user })
export default connect(mapStateToProps)(Profile)

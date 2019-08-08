import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import Iframe from 'react-iframe'
import { Button } from "react-bootstrap"
import FutureTripsContainer from "../Containers/FutureTripsContainer"
import TripCarousel from "./TripCarousel"


class Profile extends Component {

    render() {
        // console.log(this.props.user.trips)
        return (
            <div>
                <div className="user-profile">
                <br/><h2>Hey {this.props.user.name}!</h2><br/>

                    <Link to="/trip-form"> 
                        <Button  variant="primary">Log Your Trip!</Button><br/><br/>
                    </Link>  

                    <Link to="/future-trip-form"> 
                        <Button variant="primary">Create a Future Trip!</Button>
                    </Link> 

                </div><br/>

                <div align="center" id="featured-trail-map">
                    <h2>Featured Trail of the Week</h2><br/>
                    <Iframe title="trail-detail-map" className="trail-detail-map" frameborder="0" scrolling="no" 
                        src="https://www.hikingproject.com/widget?v=3&map=1&type=trail&id=0&x=-9401700&y=4014132&z=8">
                    </Iframe>
                </div><br/>

                <div>
                    <TripCarousel/>
                </div><br/>

                <div>
                    <h2>Future Trips</h2>
                    <FutureTripsContainer /><br/>
                </div>
            </div>
        )
    }
}

let mapStateToProps = state => ({ user: state.userReducer.user })
export default connect(mapStateToProps)(Profile)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Carousel } from "react-bootstrap"
import Trip from './Trip'


class TripCarousel extends Component {

    getCarousel = () => {
        if(this.props.trips.length)
            return (
                <Carousel id="carousel">
                    { this.props.trips.reverse().slice(0,10).map((nil, i) =>
                        <Carousel.Item id="carousel-item" align="center" key={i}>
                            <Trip trip={this.props.trips[i]} />
                        </Carousel.Item>
                    )}
                </Carousel>
            )
        else
            return <div className='carousel-msg'>You haven't been on any trips yet</div>
    }

    render() {
        return (
            <div>
                <h2>Recent Trips</h2>
                { this.getCarousel() }
            </div>
        )
    }
}

const mapStateToProps = state => ({ trips: state.session.user.trips })
export default connect(mapStateToProps)(TripCarousel)

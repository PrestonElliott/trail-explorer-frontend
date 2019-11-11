import React, { Component } from 'react'
import { Card } from "react-bootstrap"

class FutureTrip extends Component {

    mapTrailNames = () => this.props.futureTrip.trail_names.map((name, index) => <li key={index}>{name}</li>)

    render() {
        const trip = this.props.futureTrip
        return (
            <div>
                <Card id="future-trip-card" className="m-3">  
                    <Card.Title>{trip.title}</Card.Title>
                    <br/>
                    <Card.Subtitle className="mb-2 text-muted">Location: {trip.location}</Card.Subtitle>
                    <br/>
                    <Card.Body>
                        Notes: {trip.note}
                        <br/><br/>
                        <ul id="trail-list">
                            { this.mapTrailNames() }
                        </ul>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default FutureTrip

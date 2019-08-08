import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from "react-bootstrap"

class FutureTrip extends Component {

    render() {
        return (
            <div>
                <Card id="future-trip-card" className="m-3">
                    <Card.Body>
                        <Card.Title>{this.props.futureTrip.title}</Card.Title><br/>
                        <Card.Subtitle className="mb-2 text-muted">Location: {this.props.futureTrip.location}<br/></Card.Subtitle>
                        <Card.Text>
                            Notes: {this.props.futureTrip.note}<br/><br/>
                            <ul id="trail-list">{this.props.futureTrip.trail_names.map(trail_name => <li>{trail_name}</li>)}</ul>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

let mapStateToProps = state => ({ user: state.userReducer.user })
export default connect(mapStateToProps)(FutureTrip)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import FutureTrip from "../Components/FutureTrip"
import {Row, Col} from 'react-bootstrap'

class FutureTripsContainer extends Component {
    render() {
        return (
            <div>
                <Row className="d-flex justify-content-center m-3">
                    {this.props.user.future_trips.map(futureTrip => 
                        <Col md={3}> <FutureTrip key={futureTrip.id} futureTrip={futureTrip}/> </Col>)
                    }
                </Row> 
            </div>
        )
    }
}

let mapStateToProps = state => ({ user: state.userReducer.user })
export default connect(mapStateToProps)(FutureTripsContainer)
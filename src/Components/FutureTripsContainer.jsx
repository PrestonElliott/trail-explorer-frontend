import React, { Component } from 'react'
import { connect } from 'react-redux'
import FutureTrip from "./FutureTrip"

class FutureTripsContainer extends Component {
    render() {
        const trips = this.props.user.future_trips.reverse();
        return (
            <div className='future-trips-container'>
                { trips.map(t => <FutureTrip key={t.id} futureTrip={t}/>) }
            </div>
        )
    }
}

const mapStateToProps = state => ({ user: state.session.user })
export default connect(mapStateToProps)(FutureTripsContainer)

import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading'
import { Modal, Button, Form } from 'react-bootstrap'
import { postNewTrip } from '../actions/user'


class FutureTripForm extends Component {

    state = { 
        redirect: null,
        trail_names: []
    }

    loading = () => {
        if(!this.props.allTrails.length) {
            return (
                <div className="loading">
                    <ReactLoading className='react-loading' type="cylon" color="#026F3D" height="10%" width="50%" />
                </div>
            )
        }
    }

    handleCheckboxChange = (target, trail_name) => {
        let newArr = this.state.trail_names.slice()

        if (target.checked)
            newArr.push(trail_name)
        else 
            newArr.splice(newArr.indexOf(trail_name), 1)

        this.setState({ trail_ids: newArr })
    }

    handleSubmit = event => {
        event.preventDefault()
        const form = event.target
        const trip = {
            title: form.title.value,
            note: form.note.value,
            location: form.location.value,
            trail_names: this.state.trail_names
        }
        postNewTrip(trip, 'future_trips', this.props.dispatch)
        .then(() => this.setState({ redirect: <Redirect to='/profile' /> }))
    }

    mapTrailChoices = () => {
        if(this.props.allTrails.length) {
            return this.props.allTrails.map(trail =>
                <Fragment key={trail.id}>
                    <input type='checkbox' onChange={ e => this.handleCheckboxChange(e.target, trail.name)} /> {trail.name}
                    <br/>
                </Fragment>
            )
        }
    }

    render() {
        return (
            <Modal.Dialog>
                { this.state.redirect }
            
                <Modal.Header>
                    <Modal.Title>Plan a Future Trip</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form onSubmit={this.handleSubmit}>

                        <Form.Group>
                            <Form.Control required name='title' id='#title' placeholder='Title' />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control name='note' id='#note' placeholder='Note' />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control name='location' id='#location' placeholder='Location' />
                        </Form.Group>

                        <Form.Group className='trails-checklist'>
                            { this.loading() }
                            { this.props.geoError && <div className='geoError'>{this.props.geoError}</div> }
                            { this.mapTrailChoices() }
                        </Form.Group>

                        <Form.Group>
                            <Button disabled={!this.props.allTrails.length} type='submit'>Submit Future Trip</Button>
                        </Form.Group>
                    </Form>

                </Modal.Body>
            </Modal.Dialog>
        )
    }
}

const mapStateToProps = state => ({
    allTrails: state.location.allTrails,
    lat: state.location.lat.replace('!',''),
    lon: state.location.lon.replace('!',''),
    geoError: state.location.geoError
})
export default connect(mapStateToProps)(FutureTripForm)

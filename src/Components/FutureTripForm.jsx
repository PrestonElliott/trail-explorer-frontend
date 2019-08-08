import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, FormInput, FormGroup } from "shards-react"
import { Modal, Button } from "react-bootstrap"

class FutureTripForm extends Component {

    state = { 
        redirect: null,
        trail_names: []
    }

    fetchTrails = (lat, lon) => {
        const maxResults = 25
        const decimalReplaceLat = lat.replace('.', '!')
        const decimalReplaceLon = lon.replace('.', '!')
        fetch(`https://trail-explorer-backend.herokuapp.com/trails&lat=${decimalReplaceLat}&lon=${decimalReplaceLon}&maxResults=${maxResults}`)
        .then(res => res.json())
        .then(res => this.props.dispatch({ type: "FETCH_TRAILS", data: res }))
    }

    componentDidMount() {
        this.fetchTrails("33.7490", "-84.3880")
    }

    handleCheckboxChange = (target, trail_name) => {
        let newArr = this.state.trail_names

        if (target.checked)
            newArr.push(trail_name)
        else 
            newArr.splice(newArr.indexOf(trail_name), 1)

        this.setState({ trail_ids: newArr })
    }

    handleCreateFutureTrip = (e) => {
        e.preventDefault()
        let form = e.target

        fetch('https://trail-explorer-backend.herokuapp.com/future_trips',{
            method: 'POST',
            headers: { Authorization: localStorage.token, 
                    Accept: 'application/json', 
                    'Content-Type':'application/json' },
            body: JSON.stringify({
                future_trip: {
                    title: form.title.value,
                    note: form.note.value,
                    location: form.location.value,
                    trail_names: this.state.trail_names
                }
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.future_trip) {
                this.props.dispatch({ type: 'NEW_FUTURE_TRIP', future_trip: res.future_trip })
                this.setState({ redirect: <Redirect to='/profile' /> })
            }
        })
    }

    render() {
        if (!this.props.trail[0])
            return null

        return (
            <div>
                { this.state.redirect }

                <Modal.Dialog>
                
                    <Modal.Header>
                        <Modal.Title>Create a New Future Trip!</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <Form onSubmit={(e) => this.handleCreateFutureTrip(e)}>

                            <FormGroup>
                                <FormInput required name="title" id="#title" placeholder="Title" />
                            </FormGroup>

                            <FormGroup>
                                <FormInput name="note" id="#note" placeholder="Note" />
                            </FormGroup>

                            <FormGroup>
                                <FormInput name="location" id="#location" placeholder="Location" />
                            </FormGroup>

                            <FormGroup className='trails-checklist'>
                                { this.props.trail.map(trail => {
                                    return <Fragment key={trail.id}>
                                            <input type='checkbox' onChange={ e => this.handleCheckboxChange(e.target, trail.name)} /> {trail.name}
                                            <br/>
                                        </Fragment>
                                    })
                                }
                            </FormGroup>

                            <FormGroup>
                                <Button type="submit">Submit Future Trip</Button>
                            </FormGroup>
                        </Form>

                    </Modal.Body>
                </Modal.Dialog>
            </div>
        )
    }
}

let mapStateToProps = state => ({ trail: state.trailReducer.trail })
export default connect(mapStateToProps)(FutureTripForm)
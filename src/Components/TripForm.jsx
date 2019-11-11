import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading'
import { Modal, Button, Form } from "react-bootstrap"
import { postNewTrip } from '../actions/user'
import StarRating from './StarRating'


class TripForm extends React.Component {

    state = { 
        redirect: null,
        trail_names: [],
        stars: 0
    }

    changeStars = newScore => this.setState({ stars: newScore })

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

        this.setState({ trail_names: newArr })
    }

    handleSubmit = event => {
        event.preventDefault()
        const form = event.target
        const trip = {
            title: form.title.value,
            description: form.description.value,
            location: form.location.value,
            stars: this.state.stars,
            image: form.image.value,
            trail_names: this.state.trail_names
        }
        postNewTrip(trip, 'trips', this.props.dispatch)
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
                    <Modal.Title>Log a Previous Trip</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form onSubmit={this.handleSubmit}>

                        <Form.Group>
                            <Form.Control required name="title" id="#title" placeholder="Title" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control name="description" id="#description" placeholder="Description" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control name="location" id="#location" placeholder="Location" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control name="image" id="#image" placeholder="Image URL" />
                        </Form.Group>

                        <StarRating changeStars={this.changeStars}/>

                        <Form.Group className='trails-checklist'>
                            { this.loading() }
                            { this.props.geoError && !this.state.loading && <div className='geoError'>{this.props.geoError}</div> }
                            { this.mapTrailChoices() }
                        </Form.Group>

                        <Form.Group>
                            <Button disabled={!this.props.allTrails.length} className="m-3" type="submit">Submit Trip</Button>
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
export default connect(mapStateToProps)(TripForm)

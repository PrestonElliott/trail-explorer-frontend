import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Button, ListGroup } from "react-bootstrap"
import { FaStar } from "react-icons/fa"
import Modal from "react-modal"

class Trip extends Component {
    state = { showModal: false }

    renderTripModal = () => {
        return (
            <Modal id='trip-show-modal' isOpen={this.state.showModal} >
                <Card id="trip-show-card"> 
                    <h3>{this.props.trip.title}</h3>
                    <Card.Img id="trip-modal-image" src={this.props.trip.image}></Card.Img>

                    <Card.Body>
                        <h6>Location: {this.props.trip.location} </h6>
                        <Card.Text>Description - {this.props.trip.description}</Card.Text>
                        <Card.Text>Trip Score {this.props.trip.stars} <FaStar/> </Card.Text>
                        <h4>Trail List </h4>
                        <ListGroup className="trip-modal-trails" variant="flush">
                            {this.props.trip.trail_names.map((trail_name, index) => 
                                <ListGroup.Item key={index}>{trail_name}</ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card.Body>
                    
                    <Button onClick={()=> this.setState({ showModal: false }) } variant="secondary">Close</Button>
                </Card>
            </Modal>
        )
    }

    render() {
        return (
            <div>
                { this.renderTripModal() }

                <Card id="trip-card" >
                    <Card.Img variant="top" id="trip-card-image" src={this.props.trip.image} />
                    <Card.Body>
                    <Card.Text>
                        {this.props.trip.title}
                    </Card.Text>
                    <Button onClick={()=> this.setState({ showModal: true })} variant="primary">Trip Details</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => ({ user: state.session.user })
export default connect(mapStateToProps)(Trip)

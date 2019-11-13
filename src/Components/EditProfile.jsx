import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { Modal, Button, Form } from 'react-bootstrap'
import { backend_api } from '../constants'
import EditDiv from './EditDiv'

class EditProfile extends Component {

    state = {
        redirect: null
    }
    
    handleEditProfile = (e) => {
        e.preventDefault()
        console.log(e.target.email.value)
        if(e.target.new_password.value === e.target.confirm_password.value) {
            fetch(`${backend_api}/users/${this.props.user.id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: localStorage.token,
                    Accept: 'application/json', 
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    user: {
                        password: e.target.new_password.value
                    }
                })
            })
            .then(res => res.json())
            .then(res => {
                if (res.user) {
                    this.props.dispatch({ type: 'SET_USER', user: res.user })
                    this.setState({ redirect: <Redirect to='/profile' /> })
                }
            })
        }
        else {
            e.target.reset()
        }
    }

    render() {
        return (
            <EditDiv>
                <div id='edit-profile'>
                {this.state.redirect}
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Edit Profile</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form id='edit-profile-form' onSubmit={ this.handleEditProfile } >
                                <Form.Group>
                                    <Form.Label>Current Password</Form.Label>
                                    <Form.Control required name='current_password' type='current-password' placeholder='Current Password' />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control required name='new_password' type='new-password' placeholder='New Password' />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control required name='confirm_password' type='confirm-password' placeholder='Confirm Password' />
                                </Form.Group>                 
                                
                                <Button type='submit' variant='primary'>Save Changes</Button>

                                <Link to='/profile'> 
                                    <Button  variant='secondary'>Cancel</Button>
                                </Link> 
                            </Form>
                        </Modal.Body>
                    </Modal.Dialog>
                </div>
            </EditDiv>
        )
    }
}

const mapStateToProps = state => ({ user: state.session.user })
export default connect(mapStateToProps)(EditProfile)
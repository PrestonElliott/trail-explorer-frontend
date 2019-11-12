import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { Modal, Button, Form } from "react-bootstrap"
import { backend_api } from '../constants'
import SignUpDiv from "./SignUpDiv"

class SignUp extends Component {

    handleSignUp = (e) => {
        e.preventDefault()
        if(e.target.name.value && e.target.email.value && e.target.password.value) {
            fetch(`${backend_api}/users`, {
                method: 'POST',
                headers: { Accept: 'application/json', 'Content-Type':'application/json' },
                body: JSON.stringify({
                    user: {
                        name: e.target.name.value,
                        email: e.target.email.value.toLowerCase(),
                        password: e.target.password.value
                    }
                })
            })
            .then(res => res.json())
            .then(res => {
                if(res.jwt) {
                    this.props.dispatch({ type: 'LOG_IN', user: res.user, jwt: res.jwt  })
                }
            })
        }
    
        }
    
        render() {
            return (
                <SignUpDiv>
                <div id='SignUp'>
                    <Modal.Dialog>
                        <Modal.Header>
                            <h3>Sign Up Form</h3>
                        </Modal.Header>
    
                        <Modal.Body>
    
                            <Form onSubmit={(e) => this.handleSignUp(e)}>
                                <Form.Group>
                                    <Form.Control required name='name' id='#name' placeholder='Name' />
                                </Form.Group>
    
                                <Form.Group>
                                    <Form.Control required name='email' id='#email' placeholder='Email' />
                                </Form.Group>
    
                                <Form.Group>
                                    <Form.Control required name='password' id='#password' placeholder='Password' />
                                </Form.Group>
                                
                                <Button type="submit"> Submit </Button><br/><br/>
                            </Form>
                            
                            <Link to="/login">
                                <Button className="back-to-login"> Already have an account? </Button>
                            </Link>
                            
                        </Modal.Body>
    
                    </Modal.Dialog>
                </div>
            </SignUpDiv>
        )
    }
}

export default connect()(SignUp)
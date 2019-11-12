import React from "react";
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { Modal, Button, Form } from "react-bootstrap"
import { backend_api } from '../constants'
import LoginDiv from "./LoginDiv"

class Login extends React.Component {

    handleLogin = e => {
        e.preventDefault()
        if(e.target.email.value && e.target.password.value) {
                fetch(`${backend_api}/login`, {
                method: 'POST',
                headers: { Accept: 'application/json', 'Content-Type':'application/json' },
                body: JSON.stringify({
                    user: {
                        email: e.target.email.value.toLowerCase(),
                        password: e.target.password.value
                    }
                })
            })
            .then(res => res.json())
            .then(res => {
                if(res.jwt) {
                    this.props.dispatch({ type: 'LOG_IN', user: res.user, jwt: res.jwt })
                }
            })
        }
    }

    render() {
        return (
            <LoginDiv>
                <div id='Login'>
                    <Modal.Dialog>
                        <Modal.Header>
                            <h3>Login Form</h3>
                        </Modal.Header>
    
                        <Modal.Body>
                            <Form onSubmit={(e) => this.handleLogin(e)}>
    
                                <Form.Group>
                                    <Form.Control required name='email' id='#email' placeholder='Email' />
                                </Form.Group>
    
                                <Form.Group>
                                    <Form.Control required name='password' id='#password' placeholder='Password' />
                                </Form.Group>   
    
                                <Button type="submit">Login</Button><br/><br/>
                            </Form>
                            
                            <Link to="/signup">
                                <Button> Create Your Account Today! </Button>
                            </Link>
                        </Modal.Body>
                    </Modal.Dialog> 
                </div>
            </LoginDiv>
        )
    }
}

export default connect()(Login)
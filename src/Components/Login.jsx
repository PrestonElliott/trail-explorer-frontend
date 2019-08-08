import React from "react";
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, FormInput, FormGroup } from "shards-react"
import { Modal, Button } from "react-bootstrap"
import LoginDiv from "./LoginDiv"

class Login extends React.Component {

    state = { redirect: null }

    handleLogin = (e) => {
        e.preventDefault()
        if(e.target.email.value && e.target.password.value) {
            fetch('https://trail-explorer-backend.herokuapp.com/login',{
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
                    localStorage.setItem('token', res.jwt)
                    this.props.dispatch({ type: 'GET_USER', user: res.user })
                    this.setState({ redirect: <Redirect to='/' /> })
                }
            })
        }
    }

    render() {
        return (
            <LoginDiv>
                {this.state.redirect}
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={(e) => this.handleLogin(e)}>
                            <h3>Login Form</h3>

                            <FormGroup>
                                <label htmlFor="#email">Email</label>
                                <FormInput type="email" name="email" id="#email" placeholder="Email" />
                            </FormGroup>

                            <FormGroup>
                                <label htmlFor="#password">Password</label>
                                <FormInput name="password" type="password" id="#password" placeholder="Password" />
                            </FormGroup>

                            <Button type="submit">Login</Button><br/><br/>
                        </Form>
                        
                        <Link to="/signup">
                            <Button> Create Your Account Today! </Button>
                        </Link>
                    </Modal.Body>
                </Modal.Dialog> 
            </LoginDiv>
        )
    }
}

export default connect()(Login)
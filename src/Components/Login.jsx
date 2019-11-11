import React from "react";
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { Modal, Button } from "react-bootstrap"
import { backend_api } from '../constants'

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
            <div id='Login'>
                <Modal.Dialog>

                    <Modal.Body>
                        <form onSubmit={(e) => this.handleLogin(e)}>
                            <h3>Login Form</h3>

                            <label htmlFor="#email">Email</label>
                            <input type="email" name="email" id="#email" placeholder="Email" />

                            <label htmlFor="#password">Password</label>
                            <input name="password" type="password" id="#password" placeholder="Password" />

                        <Button type="submit">Login</Button><br/><br/>
                        </form>
                        
                        <Link to="/signup">
                            <Button> Create Your Account Today! </Button>
                        </Link>
                    </Modal.Body>
                </Modal.Dialog> 
            </div>
        )
    }
}

export default connect()(Login)
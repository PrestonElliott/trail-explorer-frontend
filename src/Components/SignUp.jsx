import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { Modal, Button } from "react-bootstrap"
import { backend_api } from '../constants'

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
            <div id='SignUp'>
                <Modal.Dialog>
                    <Modal.Header>
                        <h3>Sign Up Form</h3>
                    </Modal.Header>

                    <Modal.Body>

                        <form onSubmit={(e) => this.handleSignUp(e)}>
                            <label htmlFor="#name">Name</label>
                            <input type="name" name="name" id="#name" placeholder="Name" />

                            <label htmlFor="#email">Email</label>
                            <input type="email" name="email" id="#email" placeholder="Email" />
                        
                            <label htmlFor="#password">Password</label>
                            <input name="password" type="password" id="#password" placeholder="Password" /><br/>

                            <Button type="submit"> Submit </Button><br/>
                        </form>
                        
                        <Link to="/login">
                            <Button> Already have an account? </Button>
                        </Link>
                        
                    </Modal.Body>

                </Modal.Dialog>
            </div>
        )
    }
}

export default connect()(SignUp)
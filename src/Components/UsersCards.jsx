import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { backend_api } from '../constants'

class UsersCards extends Component {

    follow = user => {
        this.props.dispatch({ type: 'FOLLOW_USER', user })

        fetch(`${backend_api}/follows`, {
            method: "POST",
            headers: {
                Accept: 'application/json', 
                'Content-Type':'application/json',
                Authorization: localStorage.jwt
            },
            body: JSON.stringify({ followed_user_id: user.id })
        })
    }

    render() {
        return (
            <div>
                <Row className="d-flex justify-content-center m-3">
                    { this.props.allUsers.map(user => {
                        if(user.id === this.props.user.id)
                            return null
                        else
                            return (
                                <Col md={3} key={user.id}> 
                                    <Card id="user-card">
                                        <Card.Body>
                                            <Card.Img variant="top" src={user.profile_picture}/>
                                            <Card.Text>
                                                {user.name}<br/> 
                                                {user.email} 
                                            </Card.Text>
                                                { this.props.user.followed_users[user.id] ?
                                                    <Button disabled variant="danger"> Followed </Button>
                                                    :
                                                    <Button onClick={() => this.follow(user)} variant="primary">Follow!</Button> 
                                                }
                                        </Card.Body>
                                    </Card><br/> 
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => ({ user: state.session.user, allUsers: state.session.allUsers })
export default connect(mapStateToProps)(UsersCards)

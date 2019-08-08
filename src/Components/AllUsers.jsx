import React, { Component } from 'react'
import { connect } from 'react-redux'
import UsersCards from "./UsersCards"

class AllUsers extends Component {

    componentDidMount = () => {
        fetch("https://trail-explorer-backend.herokuapp.com/users", {
            method: "GET",
            headers: { Accept: 'application/json', 'Content-Type':'application/json' },
        })
        .then(res => res.json())
        .then(res => {
            this.props.dispatch({ type: "ALL_USERS", allUsers: res })
        })
    }

    render() {
        return (
            <div>
                <UsersCards/>
            </div>
        )
    }
}

export default connect()(AllUsers)
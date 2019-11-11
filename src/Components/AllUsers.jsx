import React from 'react'
import { connect } from 'react-redux'
import UsersCards from "./UsersCards"
import { backend_api } from '../constants'

class AllUsers extends React.Component {

    componentDidMount = () => {
        fetch(`${backend_api}/users`, {
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
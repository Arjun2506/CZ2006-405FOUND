import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import "../Maps/Map.css";

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return () => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        return (<div>
            <div className="col-md-6 col-md-offset-3">
                <h1>Good Day {user.firstName} {user.lastName}!</h1>
                <h1><a href="/psi">PSI Past History</a></h1>
                <h1><a href="/pm">PM2.5 Past History</a></h1>
                <h1><a href="/uv">UVI Past History</a></h1>
                <h3>All registered users:</h3>

                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import NavBar from '../NavBar/NavBar';
import SimpleMap from '../Maps/GoogleMap';
import PSI from '../Maps/PSI';
import PM from '../Maps/PM';
import UV from '../Maps/UV';
import Location from '../Maps/Location';

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen(() => {
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert } = this.props;
        return (
        <div>
            <NavBar />
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/map" component={SimpleMap} />
                                <Route path="/psi" component={PSI} />
                                <Route path="/pm" component={PM} />
                                <Route path="/uv" component={UV} />
                                <Route path="/location" component={Location} />
                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
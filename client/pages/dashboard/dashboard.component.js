import React from 'react';
import {DashboardView} from './dashboard.view';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

@connect(state => ({dashboard: state.dashboard}))
export class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        if (sessionStorage.getItem('jwtToken') === null) {
            browserHistory.push('/login');
        }
    }

    render() {
        return <DashboardView dashboard={this.props.dashboard}/>;
    }
}

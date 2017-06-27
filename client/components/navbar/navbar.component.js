import React from 'react';
import { connect } from 'react-redux';
import { NavbarView } from './navbar.view';
import { browserHistory } from 'react-router';

@connect(state => ({ navbar: state.navbar }))
export class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            viewOrEditMode: 'viewMode',
            events: {
                changeMode: () => {
                    if (this.state.viewOrEditMode === 'viewMode') {
                        this.setState({viewOrEditMode: 'settingMode'});
                        props.dispatch({ type: 'DASHBOARD_CHANGE_MODE', dashboardsData: 'settingMode' });
                    } else if (this.state.viewOrEditMode === 'settingMode') {
                        this.setState({viewOrEditMode: 'viewMode'});
                        props.dispatch({ type: 'DASHBOARD_CHANGE_MODE', dashboardsData: 'viewMode' });
                    }
                },
                logOut: () => {
                    sessionStorage.removeItem('jwtToken');
                    browserHistory.push('/login');
                }
            }
        };

        props.dispatch({ type: 'DASHBOARD_CHANGE_MODE', dashboardsData: this.state.viewOrEditMode });
    }

    render() {
        return <NavbarView navbarConfig={this.state}/>;
    }
}

import React from 'react';
import { connect } from 'react-redux';
import { NavbarView } from './navbar.view';

@connect(state => ({ navbar: state.navbar }))
export class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = { viewOrEditMode: 'viewMode' };
        props.dispatch({type: 'DASHBOARD_CHANGE_MODE', dashboardsData: this.state.viewOrEditMode});
    }

    render() {
        return <NavbarView />;
    }
}

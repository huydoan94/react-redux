import React from 'react';
import { Link } from 'react-router';
import { Nav, Navbar, NavDropdown, MenuItem } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';

export const NavbarView = (props) => {
    const fullName = sessionStorage.getItem('jwtToken') ?
            jwtDecode(sessionStorage.getItem('jwtToken')).fullname : '',
        title =
            <div style={{ display: 'inline' }}>
                <span style={{ color: 'white' }} className='glyphicon glyphicon-user'></span>
                <span style={{ color: 'white' }}>&nbsp;&nbsp;{fullName}</span>
            </div>;

    const { navbarConfig } = props;

    return (
        <Navbar inverse fixedTop fluid style={{ backgroundColor: '#245380' }}>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to='/dashboard'>
                        <span style={{ color: 'white' }} className='glyphicon glyphicon-dashboard' />
                        <span style={{ color: 'white' }}>&nbsp;Dashboard</span>
                    </Link>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight>
                {sessionStorage.getItem('jwtToken') &&
                    <NavDropdown title={title} id='UserDropdown'>
                        <MenuItem onClick={navbarConfig.events.changeMode}>
                            {navbarConfig.viewOrEditMode === 'viewMode' && ('Edit')}
                            {navbarConfig.viewOrEditMode === 'settingMode' && ('View')}
                        </MenuItem>
                        <MenuItem onClick={navbarConfig.events.logOut}>Log out</MenuItem>
                    </NavDropdown>
                }
            </Nav>
        </Navbar>
    );
};

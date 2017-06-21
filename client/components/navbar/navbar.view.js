import React from 'react';
import { Link } from 'react-router';
import { Nav, Navbar, NavDropdown, MenuItem } from 'react-bootstrap';

export const NavbarView = () => {
    const title = <div style={{ display: 'inline' }}>
                    <span style={{ color: 'white' }} className='glyphicon glyphicon-user'></span>
                    <span style={{ color: 'white' }}>&nbsp;&nbsp;Admin</span>
                  </div>;

    return (
        <Navbar inverse fixedTop fluid style={{ backgroundColor: '#245380' }}>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to='/dashboard'>
                        <span style={{ color: 'white' }} className='glyphicon glyphicon-dashboard'></span>
                        <span style={{ color: 'white' }}>&nbsp;Dashboard</span>
                    </Link>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight>
                <NavDropdown title={title}>
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>Log out</MenuItem>
                </NavDropdown>
            </Nav>
        </Navbar>
    );
};

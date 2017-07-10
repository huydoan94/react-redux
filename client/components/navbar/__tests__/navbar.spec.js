import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { NavbarView } from '../navbar.view';
import { Navbar } from 'react-bootstrap';

describe('navbar view', () => {
    let navbarWrapper = null;
    const navbarView = () => {
        if (!navbarWrapper) {
            navbarWrapper = shallow(<NavbarView/>);
        }

        return navbarWrapper;
    };

    it('render a Navbar', () => {
        expect(navbarView().find(Navbar)).to.have.length(1);
    });
});
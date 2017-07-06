import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import { Button } from '../button.view';

describe('button.view', () => {
    let props = null,
        buttonAttribute = null,
        buttonEvent = null,
        renderedButtonView = null;

    const buttonView = () => {
        if (!renderedButtonView) {
            renderedButtonView = shallow(<Button {...props} />);
        }

        return renderedButtonView;
    };

    beforeEach(() => {
        renderedButtonView = null;
        buttonEvent = {
            onButtonClick: sinon.spy()
        };
        buttonAttribute = {
            buttonStyle: '',
            buttonContent: 'Submit button'
        };

        props = {
            buttonAttribute,
            buttonEvent
        };
    });

    it('always render a button element', () => {
        const buttons = buttonView().find('button');

        expect(buttons.length).to.equal(1);
    });

    describe('rendered button', () => {
        it('should has property as passed', () => {
            const button = buttonView().find('button').first();

            // expect(button.prop('styleName')).to.equal('');
            expect(button.prop('onClick')).to.equal(buttonEvent.onButtonClick);
        });

        it('should render \'Submit button\' as name ', () => {
            const button = buttonView().find('button').first();

            expect(button.text()).to.equal('Submit button');
        });

        it('should call onButtonClick function', () => {
            const button = buttonView().find('button').first();

            // Simulate click
            button.simulate('click');

            expect(buttonEvent.onButtonClick.calledOnce).to.equal(true);
        });
    });
});
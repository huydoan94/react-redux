import React from 'react';
import { ButtonView } from './button.view';

export const Button = ({buttonAttribute, buttonEvent}) => {
    return <ButtonView buttonAttribute={buttonAttribute} buttonEvent={buttonEvent}/>;
};

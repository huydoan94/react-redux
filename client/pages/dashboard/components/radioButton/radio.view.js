import React from 'react';
import cssModules from 'react-css-modules';
import style from './radio.style.scss';

export const RadioView = cssModules(({ radio }) => {
    return (
        <div styleName='radio-wrapper'>
            <input type="radio" name={radio.name} id={radio.id} />
            <label htmlFor={radio.id}>{radio.label}</label>
        </div>
    );
}, style, { errorWhenNotFound: false });
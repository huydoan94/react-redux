
import React from 'react';
import cssModules from 'react-css-modules';
import style from './button.style.scss';

export const Button = cssModules(({ buttonAttribute, buttonEvent }) => {
    return (
        <button styleName={buttonAttribute.buttonStyle}
                onClick={buttonEvent.onButtonClick}>
            {buttonAttribute.buttonContent}
        </button>
    );
}, style);

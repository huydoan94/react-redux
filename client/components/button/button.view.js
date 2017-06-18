
import React from 'react';
import cssModules from 'react-css-modules';
import style from './button.style.scss';

export const ButtonView = cssModules(({ buttonDetail, classButton }) => {

    return (
        <button styleName={classButton} onClick={buttonDetail.onButtonClick}>
            {buttonDetail.buttonContent}
        </button>
    );
}, style);

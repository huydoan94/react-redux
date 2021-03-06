import React from 'react';
import cssModules from 'react-css-modules';
import style from './widget-body.style.scss';

export const WidgetBody = cssModules((props) => {
    return (
        <div>
            {props.children}
        </div>
    );
}, style);

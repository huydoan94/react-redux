import React from 'react';
import cssModules from 'react-css-modules';
import style from './widget-container.style.scss';

export const WidgetContainer = cssModules((props) => {
    return (
        <div styleName='widget-container'>
            {props.children}
        </div>
    );
}, style, {errorWhenNotFound: false});

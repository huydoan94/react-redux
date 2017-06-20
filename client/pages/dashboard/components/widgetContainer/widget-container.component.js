import React from 'react';
import cssModules from 'react-css-modules';
import style from './widget-container.style.scss';

export const WidgetContainer = cssModules((props) => {
    return (
        <div className='panel panel-primary col-md-4' styleName='widget-container'>
            {props.children}
        </div>
    );
}, style, {errorWhenNotFound: false});

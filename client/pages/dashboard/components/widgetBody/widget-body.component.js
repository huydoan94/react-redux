import React from 'react';
import cssModules from 'react-css-modules';
import style from './widget-body.style.scss';

export const WidgetBody = cssModules((props) => {
    return (
        <div className='panel-body col-md-12'>
            {props.children}
        </div>
    );
}, style, {errorWhenNotFound: false});

import React from 'react';
import cssModules from 'react-css-modules';
import style from './widget-container.style.scss';

export const WidgetContainer = cssModules((props) => {
    props.minHeight = '200'+'px';
    return (
        <div styleName='widget-container' style={{height: props.minHeight}}>
            {props.children}
        </div>
    );
}, style, {errorWhenNotFound: false});

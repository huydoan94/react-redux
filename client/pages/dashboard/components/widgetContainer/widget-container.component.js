import React from 'react';
import cssModules from 'react-css-modules';
import style from './widget-container.style.scss';

export const WidgetContainer = cssModules((props) => {
    return (
        <div className={props.colStyle} style={{padding: '0 2px'}}>
            <div className='panel panel-primary'
                 styleName='widget-container'
                 style={{minHeight: props.maxHeight}}>
                {props.children}
            </div>
        </div>
    );
}, style);

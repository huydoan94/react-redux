import React from 'react';
import cssModules from 'react-css-modules';
import style from './widget-container.style.scss';

export const WidgetContainer = cssModules((props) => {
    const isHidden = (props.isHidden === 'yes') ? 'hidden' : null,
        parentStyle = typeof props.colStyle === 'string' ?
            props.colStyle : null,
        childStyle = typeof props.colStyle === 'object' ?
            props.colStyle : { minHeight: props.minHeight, visibility: isHidden };

    return (
        <div className={parentStyle}
            style={{
                minHeight: props.minHeight,
                padding: '0 2px'
            }}
        >
            <div className={`panel panel-primary`}
                styleName='widget-container'
                style={childStyle}>
                {props.children}
            </div>
        </div>
    );
}, style);

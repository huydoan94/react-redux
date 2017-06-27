import React from 'react';
import cssModules from 'react-css-modules';
import style from './widget-container.style.scss';

export const WidgetContainer = cssModules((props) => {
    const isHidden = (props.widgetMode === 'viewMode') ? 'hidden' : null,
        colStyle = props.colStyle,
        parentStyle = typeof colStyle === 'string' ? colStyle : null,
        childStyle = typeof colStyle === 'object' ? colStyle : {minHeight: props.minHeight, visibility: isHidden};

    return (
        <div className={parentStyle}
            style={{
                minHeight: props.minHeight,
                padding: '0 2px'
            }} >
            <div className={`panel panel-primary`}
                styleName='widget-container'
                style={childStyle}>
                {props.children}
            </div>
        </div>
    );
}, style);

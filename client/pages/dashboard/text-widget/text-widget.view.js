import React from 'react';
import cssModules from 'react-css-modules';

import style from './text-widget.style.scss';

import { WidgetContainer } from '../components/widgetContainer';
import { WidgetHeader } from '../components/widgetHeader';
import { WidgetBody } from '../components/widgetBody';

export const TextWidgetView = cssModules(({ widget, colStyle, maxHeight }) => {
    return (
        <WidgetContainer colStyle={colStyle} maxHeight={maxHeight}>
            <WidgetHeader widget={widget} />
            <WidgetBody>
                <div styleName='widget-container__text'>
                    {widget.configs.text}
                </div>
            </WidgetBody>
        </WidgetContainer>
    );
}, style);

import React from 'react';
import cssModules from 'react-css-modules';

import style from './text-widget.style.scss';

import { WidgetContainer } from '../components/widgetContainer';
import { WidgetHeader } from '../components/widgetHeader';
import { WidgetBody } from '../components/widgetBody';

export const TextWidgetView = cssModules((props) => {
    const { WidgetConfigs, WidgetStyles } = props;

    return (
        <WidgetContainer colStyle={WidgetStyles.colStyle} minHeight={WidgetStyles.minHeight}>
            <WidgetHeader widget={{
                title: WidgetConfigs.title,
                mode: WidgetConfigs.mode,
                buttonEventCatcher: WidgetConfigs.panelEvent
            }} />
            <WidgetBody>
                <div styleName='widget-container__text'>
                    {WidgetConfigs.configs.text}
                </div>
            </WidgetBody>
        </WidgetContainer>
    );
}, style);

import React from 'react';
import cssModules from 'react-css-modules';
import Markdown from 'react-remarkable';

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
                widgetMode: WidgetConfigs.widgetMode,
                buttonEventCatcher: WidgetConfigs.panelEvent
            }} />
            <WidgetBody>
                <div styleName='widget-container__text'>
                    <Markdown
                        source={WidgetConfigs.configs.text}
                    />
                </div>
            </WidgetBody>
        </WidgetContainer>
    );
}, style);

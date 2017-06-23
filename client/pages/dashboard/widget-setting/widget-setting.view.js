import React from 'react';
import cssModules from 'react-css-modules';

import style from './widget-setting.style.scss';

import { WidgetContainer } from '../components/widgetContainer';
import { WidgetHeader } from '../components/widgetHeader';
import { WidgetBody } from '../components/widgetBody';
import { Input } from '../../../components/input';
import { Select } from '../../../components/select';

export const WidgetSettingView = cssModules((props) => {
    const { WidgetType,
        EditWidgetValues,
        WidgetSelector,
        subViewSetting,
        colStyle,
        isRevealed,
        revealSettings } = props;

    return (
        <WidgetContainer colStyle={colStyle}>
            <WidgetHeader widget={WidgetType} className='row col-md-12' />
            <WidgetBody className='row col-md-12'>
                { isRevealed ? (
                        <div>
                            <Input inputAtrribute={EditWidgetValues} />
                            <Select WidgetSelector={WidgetSelector} />
                            {subViewSetting}
                        </div>
                    ) : (
                        <span styleName='plus-icon' onClick={revealSettings}>+</span>
                    )
                }
            </WidgetBody>
        </WidgetContainer>
    );
}, style);
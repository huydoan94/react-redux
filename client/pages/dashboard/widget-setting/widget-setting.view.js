import React from 'react';
import cssModules from 'react-css-modules';

import style from './widget-setting.style.scss';

import { WidgetContainer } from '../components/widgetContainer';
import { WidgetHeader } from '../components/widgetHeader';
import { WidgetBody } from '../components/widgetBody';
import { Input } from '../../../components/input';

// const editorStyle = {
//     overflow: 'auto',
//     width: 300,
//     height: 100,
//     maxHeight: 100
// };

export const WidgetSettingView = cssModules(({ WidgetType, EditWidgetValues }) => {
    return (
        <WidgetContainer>
            <WidgetHeader widget={WidgetType} className='row col-md-12'/>
            <WidgetBody className='row col-md-12'>
                <Input inputAtrribute={EditWidgetValues} />
                <div className="form-group">
                    <label>Text Content:</label>
                </div>
            </WidgetBody>
        </WidgetContainer>
    );
}, style);

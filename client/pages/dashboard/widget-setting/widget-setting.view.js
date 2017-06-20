import React, { Component } from 'react';
import cssModules from 'react-css-modules';

import style from './widget-setting.style.scss';

import { WidgetContainer } from '../components/widgetContainer';
import { WidgetHeader } from '../components/widgetHeader';
import { WidgetBody } from '../components/widgetBody';
import { Input } from '../../../components/input';
import { Select } from '../../../components/select';
import {TextSettingView} from './subViews/textSetting.view';

export class WidgetSettingView extends Component {
    render = cssModules(() => {
        return (
            <WidgetContainer>
                <WidgetHeader widget={this.props.WidgetType} className='row col-md-12' />
                <WidgetBody className='row col-md-12'>
                    <Input inputAtrribute={this.props.EditWidgetValues} />
                    <Select WidgetSelector={this.props.WidgetSelector} />
                    <TextSettingView/>
                </WidgetBody>
            </WidgetContainer>
        );
    }, style);
}
import React from 'react';
import { TextWidgetSettingView } from './text-widget-setting.view';

const widget = {
    title: 'Widget Setting',
    mode: 'settingMode'
};

export class TextWidgetSetting extends React.Component {
    constructor(props) {
        super(props);

        this.init();
    }

    init = () => {
        this.inputWidgetTitle = {
            placeholder: 'New Widget',
            label: 'Widget title: '
        };
    }

    render() {
        return <TextWidgetSettingView
            widget={widget}
            inputWidgetTitle={this.inputWidgetTitle}
        />;
    }
}
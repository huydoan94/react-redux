import React from 'react';
import { WidgetSettingView } from './widget-setting.view';

export class WidgetSetting extends React.Component {
    constructor(props) {
        super(props);

        this.init();
    }

    init = () => {
        this.WidgetType = {
            title: 'Widget Setting',
            mode: 'settingMode'
        };

        this.EditWidgetValues = {
            placeholder: 'New Widget',
            label: 'Widget title: '
        };
    }

    render() {
        return <WidgetSettingView
            WidgetType={this.WidgetType}
            EditWidgetValues={this.EditWidgetValues}
        />;
    }
}
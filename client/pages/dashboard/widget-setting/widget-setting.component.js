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

        this.WidgetSelector = [
            {
                id: 0,
                type: 'Text'
            },
            {
                id: 1,
                type: 'Database'
            },
            {
                id: 2,
                type: 'Org Chart'
            }
        ];
    }

    render() {
        return <WidgetSettingView
            WidgetType={this.WidgetType}
            EditWidgetValues={this.EditWidgetValues}
            WidgetSelector={this.WidgetSelector}
        />;
    }
}
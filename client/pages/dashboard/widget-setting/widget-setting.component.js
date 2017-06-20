import React from 'react';
import { WidgetSettingView } from './widget-setting.view';
import { TextSettingView, DatabaseSettingView, OrgChartSettingView } from './subViews';

export class WidgetSetting extends React.Component {
    constructor(props) {
        super(props);

        this.init();
    }

    init = () => {
        this.state = {
            subViewSetting: <TextSettingView />
        };

        this.WidgetType = {
            title: 'Widget Setting',
            mode: 'settingMode'
        };

        this.EditWidgetValues = {
            placeholder: 'New Widget',
            label: 'Widget title: '
        };

        this.WidgetSelector = {
            label: 'Widget Type:',
            options: [
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
            ],
            events: {
                onSelectorChange: (event) => {
                    const subViewSetting = this.setSubViewSetting(event.target.value);

                    this.setState({ subViewSetting });
                }
            }
        };
    }

    setSubViewSetting = (viewSetting) => {
        switch (viewSetting) {
        case 'Text':
            return <TextSettingView />;
        case 'Database':
            return <DatabaseSettingView />;
        case 'Org Chart':
            return <OrgChartSettingView />;
        default:
            return <TextSettingView />;
        }
    }

    render() {
        return (
            <WidgetSettingView
                WidgetType={this.WidgetType}
                EditWidgetValues={this.EditWidgetValues}
                WidgetSelector={this.WidgetSelector}
                subViewSetting={this.state.subViewSetting}
            />
        );
    }
}
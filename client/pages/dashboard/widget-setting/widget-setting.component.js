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
            title: 'Widget Setting',
            mode: 'settingMode',
            subViewSetting: <TextSettingView />,
            isRevealed: false
        };
    }

    EditWidgetValues = {
        placeholder: 'New Widget',
        label: 'Widget title: '
    };

    WidgetSelector = {
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
    }

    SaveButton = {
        label: 'Save',
        events: {
            onSave: (event) => {
                this.props.addWidget(this.props.id);
            }
        }
    }

    CancelButton = {
        label: 'Cancel',
        events: {
            onCancel: (event) => {
                // this.props.addWidget(this.props.id);
            }
        }
    }

    propsChanged = (data) => {
        console.log(data);
    }

    setSubViewSetting = (viewSetting) => {
        switch (viewSetting) {
        case 'Text':
            return <TextSettingView />;
        case 'Database':
            return <DatabaseSettingView propsChanged={this.propsChanged}/>;
        case 'Org Chart':
            return <OrgChartSettingView />;
        default:
            return <TextSettingView />;
        }
    }

    RevealSettings = (event) => {
        if (event.target) {
            this.setState({ isRevealed: true });
        }
    }

    render() {
        return (
            <WidgetSettingView
                WidgetConfigs={this.state}
                WidgetStyles={{colStyle: this.props.colStyle}}
                EditWidgetValues={this.EditWidgetValues}
                WidgetSelector={this.WidgetSelector}
                SaveButton={this.SaveButton}
                CancelButton={this.CancelButton}
                RevealSettings={this.RevealSettings}
            />
        );
    }
}
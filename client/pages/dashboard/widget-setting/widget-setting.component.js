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
            widgetType: 'TEXT_WIDGET',
            subViewSetting: <TextSettingView />,
            isRevealed: false
        };
    }

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
            },
            {
                id: 3,
                type: 'Todo List'
            }
        ],
        events: {
            onSelectorChange: (event) => {
                const subViewSetting = this.setSubViewSetting(event.target.value);

                this.setState({ subViewSetting });
            }
        }
    }

    inputWidgetName = {
        type: 'text',
        label: 'Widget Title',
        placeholder: 'New Widget',
        value: '',
        event: (ref) => {
            this.inputWidgetName.value = ref.value;
        }
    };

    inputWidgetHeight = {
        type: 'text',
        label: 'Min Height',
        placeholder: '200',
        value: '',
        event: (ref) => {
            this.inputWidgetHeight.value = ref.value;
        }
    };

    inputWidgetWidth = {
        type: 'text',
        label: 'Min Width',
        placeholder: '400',
        value: '',
        event: (ref) => {
            this.inputWidgetWidth.value = ref.value;
        }
    };

    SaveButton = {
        label: 'Save',
        events: {
            onSave: (event) => {
                if (event.target) {
                    let thisWidgetPosition = parseInt((this.props.id).substring('widgetPos_'.length), 10),
                        data = {
                            widgetType: this.state.widgetType,
                            widgetName: this.inputWidgetName.value === '' ? 'Widget' : this.inputWidgetName.value,
                            widgetHeight: this.inputWidgetHeight.value === '' ? 200 : parseInt(this.inputWidgetHeight.value, 10),
                            widgetWidth: this.inputWidgetWidth.value === '' ? 400 : parseInt(this.inputWidgetWidth.value, 10)
                        };

                    this.props.addWidget(thisWidgetPosition, data);
                }
            }
        }
    }

    CancelButton = {
        label: 'Cancel',
        events: {
            onCancel: (event) => {
                if (event.target) {
                    this.setState({ isRevealed: false });
                }
            }
        }
    }

    propsChanged = (data) => {
        console.log(data);
    }

    setSubViewSetting = (viewSetting) => {
        switch (viewSetting) {
        case 'Text':
            this.setState({ widgetType: 'TEXT_WIDGET' });

            return <TextSettingView />;
        case 'Database':
            this.setState({ widgetType: 'DATABASE_WIDGET' });

            return <DatabaseSettingView propsChanged={this.propsChanged} />;
        case 'Org Chart':
            this.setState({ widgetType: 'ORGCHART_WIDGET' });

            return <OrgChartSettingView />;
        case 'Todo List':
            this.setState({ widgetType: 'TODOLIST_WIDGET' });

            return;
        default:
            this.setState({ widgetType: 'TEXT_WIDGET' });

            return <TextSettingView />;
        }
    }

    revealSettings = (event) => {
        if (event.target) {
            this.setState({ isRevealed: true, subViewSetting: <TextSettingView /> });
        }
    }

    render() {
        return (
            <WidgetSettingView
                WidgetConfigs={this.state}
                WidgetStyles={{ colStyle: this.props.colStyle }}
                WidgetSelector={this.WidgetSelector}
                WidgetNameInput={this.inputWidgetName}
                WidgetHeightInput={this.inputWidgetHeight}
                WidgetWidthInput={this.inputWidgetWidth}
                SaveButton={this.SaveButton}
                CancelButton={this.CancelButton}
                RevealSettings={this.revealSettings}
                widgetMode={this.props.widgetMode}
            />
        );
    }
}
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
            isRevealed: false
        };
    }

    componentWillMount() {
        if (this.props.originWidget) {
            const originWidget = this.props.originWidget;

            switch (originWidget.type) {
            case 'TEXT_WIDGET':
                this.setSubViewSetting('Text');
                break;
            case 'DATABASE_WIDGET':
                this.setSubViewSetting('Database');
                break;
            case 'ORGCHART_WIDGET':
                this.setSubViewSetting('Org Chart');
                break;
            case 'TODOLIST_WIDGET':
                this.setSubViewSetting('Todo List');
                break;
            default:
                break;
            }

            this.WidgetNameInput.value = originWidget.widgetContent.title;
            this.WidgetHeightInput.value = originWidget.widgetContent.minHeight;

            this.setState({
                title: originWidget.widgetContent.title,
                widgetType: originWidget.type,
                isRevealed: true
            });
        } else {
            this.setSubViewSetting('Text');
        }
    }

    WidgetSelector = {
        label: 'Widget Type:',
        options: [
            {
                id: 0,
                type: 'Text',
                selected: this.props.originWidget ?
                    this.props.originWidget.type === 'TEXT_WIDGET' : false
            },
            {
                id: 1,
                type: 'Database',
                selected: this.props.originWidget ?
                    this.props.originWidget.type === 'DATABASE_WIDGET' : false
            },
            {
                id: 2,
                type: 'Org Chart',
                selected: this.props.originWidget ?
                    this.props.originWidget.type === 'ORGCHART_WIDGET' : false
            },
            {
                id: 3,
                type: 'Todo List',
                selected: this.props.originWidget ?
                    this.props.originWidget.type === 'TODOLIST_WIDGET' : false
            }
        ],
        events: {
            onSelectorChange: (event) => {
                this.setSubViewSetting(event.target.value);
            }
        }
    }

    WidgetNameInput = {
        type: 'text',
        label: 'Widget Title',
        placeholder: 'New Widget',
        value: '',
        event: (ref) => {
            this.WidgetNameInput.value = ref.value;
        }
    };

    WidgetHeightInput = {
        type: 'text',
        label: 'Min Height',
        placeholder: '200',
        value: '',
        event: (ref) => {
            this.WidgetHeightInput.value = ref.value;
        }
    };

    WidgetWidthInput = {
        type: 'text',
        label: 'Min Width',
        placeholder: '400',
        value: '',
        event: (ref) => {
            this.WidgetWidthInput.value = ref.value;
        }
    };

    SaveButton = {
        label: 'Save',
        events: {
            onSave: () => {
                const defaultWidgetName = 'A Widget',
                    defaultWidth = 400,
                    defaultHeight = 200;

                let thisWidgetPosition = parseInt((this.props.id).substring('widgetPos_'.length), 10),
                    data = {
                        widgetType: this.state.widgetType,

                        widgetName: this.WidgetNameInput.value === '' ?
                            defaultWidgetName : this.WidgetNameInput.value,

                        widgetHeight: this.WidgetHeightInput.value === '' ?
                            defaultHeight : parseInt(this.WidgetHeightInput.value, 10),

                        widgetWidth: this.WidgetWidthInput.value === '' ?
                            defaultWidth : parseInt(this.WidgetWidthInput.value, 10),

                        widgetConfig: this.state.widgetConfig
                    };

                this.props.addOrUpdateWidget(thisWidgetPosition, data, typeof this.props.originWidget !== 'undefined');
            }
        }
    }

    CancelButton = {
        label: 'Cancel',
        events: {
            onCancel: () => {
                if (this.props.originWidget) {
                    this.props.originWidget.onCancel();
                } else {
                    this.setState({ isRevealed: false });
                }
            }
        }
    }

    onSettingConfigsChange = (data) => {
        switch (this.state.widgetType) {
        case 'TEXT_WIDGET':
            this.setState({
                widgetConfig: {
                    text: data
                }
            });
            break;

        case 'DATABASE_WIDGET':
            this.setState({
                widgetConfig: {
                    source: data.source,
                    columns: data.columns
                }
            });
            break;

        case 'ORGCHART_WIDGET':
            this.setState({
                widgetConfig: {
                    root: data
                }
            });
            break;

        default:
            this.setState({
                widgetConfig: {
                    text: data
                }
            });
        }
    }

    setSubViewSetting = (viewSetting) => {
        let subViewSetting = null;

        switch (viewSetting) {
        case 'Text':
            this.setState({
                widgetType: 'TEXT_WIDGET'
            });

            subViewSetting = <TextSettingView
                onSettingConfigsChange={this.onSettingConfigsChange}
                initialContent={this.props.originWidget}
            />;

            break;
        case 'Database':
            this.setState({
                widgetType: 'DATABASE_WIDGET'
            });

            subViewSetting = <DatabaseSettingView
                onSettingConfigsChange={this.onSettingConfigsChange}
                initialContent={this.props.originWidget}
            />;

            break;
        case 'Org Chart':
            this.setState({
                widgetType: 'ORGCHART_WIDGET'
            });

            subViewSetting = <OrgChartSettingView
                onSettingConfigsChange={this.onSettingConfigsChange}
                initialContent={this.props.originWidget}
            />;

            break;
        case 'Todo List':
            this.setState({
                widgetType: 'TODOLIST_WIDGET',
                widgetConfig: {
                    todos: this.props.originWidget &&
                        typeof this.props.originWidget.widgetContent.todos !== 'undefined' ?
                            this.props.originWidget.widgetContent.todos.map((todo) => parseInt(todo.id, 10)) : []
                }
            });

            break;
        default:
            this.setState({
                widgetType: 'TEXT_WIDGET'
            });

            subViewSetting = <TextSettingView
                onSettingConfigsChange={this.onSettingConfigsChange}
                initialContent={this.props.originWidget}
            />;
        }

        this.setState({ subViewSetting });
    }

    revealSettings = (event) => {
        if (event.target) {
            this.setState({ isRevealed: true });
        }
    }

    render() {
        return (
            <WidgetSettingView
                WidgetConfigs={this.state}
                WidgetStyles={{ colStyle: this.props.colStyle }}
                WidgetSelector={this.WidgetSelector}
                WidgetNameInput={this.WidgetNameInput}
                WidgetHeightInput={this.WidgetHeightInput}
                WidgetWidthInput={this.WidgetWidthInput}
                SaveButton={this.SaveButton}
                CancelButton={this.CancelButton}
                RevealSettings={this.revealSettings}
                isHidden={this.props.widgetMode === 'viewMode' ? 'yes' : null}
            />
        );
    }
}
import React from 'react';
import { TextWidgetView } from './text-widget.view';
import { connect } from 'react-redux';

import { WidgetSetting } from '../widget-setting/widget-setting.component';

@connect(state => ({ textWidget: state.textWidget }))
export class TextWidget extends React.Component {
    constructor(props) {
        super(props);

        this.init();
    }

    init = () => {
        this.state = {
            type: 'TEXT_WIDGET',
            title: this.props.widgetTitle,
            configs: {
                text: this.props.widgetContent
            },
            widgetMode: this.props.widgetMode,
            panelEvent: (event) => {
                this.panelEventTrigger(event.target.value);
            },
            styles: {
                colStyle: this.props.colStyle,
                minHeight: this.props.userHeight
            },
            isSetting: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            styles: {
                colStyle: nextProps.colStyle,
                minHeight: nextProps.userHeight
            },
            title: nextProps.widgetTitle,
            widgetMode: nextProps.widgetMode,
            configs: {
                text: nextProps.widgetContent
            }
        });
    }

    panelEventTrigger(eventType) {
        const thisWidgetPosition = parseInt((this.props.id).substring('widgetPos_'.length), 10);

        switch (eventType) {
        case 'fullscreen':
            this.setState({
                isMaximized: !this.state.isMaximized,
                styles: {
                    colStyle: !this.state.isMaximized ?
                    {
                        position: 'fixed',
                        left: '0',
                        top: '50px',
                        right: '0',
                        bottom: '-20px',
                        zIndex: '1000'
                    } : this.props.colStyle,
                    minHeight: this.props.userHeight
                }
            });
            break;
        case 'setting':
            this.setState({ isSetting: true });
            break;
        case 'remove':
            this.props.deleteWidget(thisWidgetPosition);
            break;
        default:
            break;
        }
    }

    onUpdateCompleted = (widgetPosition, settingData, isUpdate) => {
        isUpdate ? this.setState({ isSetting: false }) : null;
        this.props.addOrUpdateWidget(widgetPosition, settingData, isUpdate);
    }

    render() {
        return this.state.isSetting ?
            <WidgetSetting
                key={this.props.id}
                id={this.props.id}
                colStyle={this.state.styles.colStyle}
                widgetMode={this.state.widgetMode}
                addOrUpdateWidget={this.onUpdateCompleted}
                originWidget={{
                    type: this.state.type,
                    widgetContent: {
                        title: this.state.title,
                        minHeight: this.state.styles.minHeight,
                        text: this.state.configs.text
                    },
                    onCancel: () => {
                        this.setState({ isSetting: false });
                    }
                }}
            /> :
            <TextWidgetView
                WidgetConfigs={this.state}
                WidgetStyles={{ colStyle: this.state.styles.colStyle, minHeight: this.state.styles.minHeight }}
            />;
    }
}
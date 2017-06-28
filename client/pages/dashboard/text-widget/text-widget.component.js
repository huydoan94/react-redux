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

        this.widget = {
            type: 'TEXT_WIDGET',
            text: this.props.widgetContent
        };
    }

    panelEventTrigger(eventType) {
        let thisWidgetPosition = parseInt((this.props.id).substring('widgetPos_'.length), 10);

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
            this.setState({isSetting: true});
            break;
        case 'remove':
            this.props.deleteWidget(thisWidgetPosition);
            break;
        default:
            break;
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            styles: {
                colStyle: nextProps.colStyle,
                minHeight: nextProps.userHeight
            },
            title: nextProps.widgetTitle,
            widgetMode: nextProps.widgetMode
        });
    }

    render() {
        return this.state.isSetting ?
                    <WidgetSetting
                        widget={this.widget}
                        key={this.props.id}
                        id={this.props.id}
                        colStyle={this.state.styles.colStyle}
                        widgetMode={this.state.widgetMode}
                    /> :
                    <TextWidgetView
                        WidgetConfigs={this.state}
                        WidgetStyles={{ colStyle: this.state.styles.colStyle, minHeight: this.state.styles.minHeight }}
                    />;
    }
}
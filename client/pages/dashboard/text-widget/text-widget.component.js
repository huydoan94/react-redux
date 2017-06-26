import React from 'react';
import { TextWidgetView } from './text-widget.view';
import { connect } from 'react-redux';

@connect(state => ({ textWidget: state.textWidget }))
export class TextWidget extends React.Component {
    constructor(props) {
        super(props);

        this.init();
    }

    init = () => {
        this.state = {
            title: 'Text Widget',
            configs: {
                text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            },
            mode: 'editMode',
            panelEvent: (event) => {
                let thisWidgetPosition = parseInt((this.props.id).substring('widgetPos_'.length), 10);

                switch (event.target.value) {
                case 'fullscreen':
                    break;
                case 'setting':
                    break;
                case 'remove':
                    this.props.deleteWidget(thisWidgetPosition);
                    break;
                default:
                    break;
                }
            }
        };
    }

    render() {
        return <TextWidgetView
            WidgetConfigs={this.state}
            WidgetStyles={{colStyle: this.props.colStyle, minHeight: this.props.userHeight}}
        />;
    }
}
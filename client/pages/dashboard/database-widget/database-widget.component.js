import React from 'react';
import { DatabaseWidgetView } from './database-widget.view';
import { getAll } from './database-widget.services';
import { connect } from 'react-redux';

@connect(state => ({ databaseWidget: state.databaseWidget }))
export class DatabaseWidget extends React.Component {
    constructor(props) {
        super(props);

        this.init();
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

    init = () => {
        this.state = {
            title: this.props.widgetTitle,
            widgetMode: this.props.widgetMode,
            database: this.props.widgetContent.source,
            DatabaseTable: {
                headers: ["id", "None", "None"],
                values: []
            },
            panelEvent: (event) => {
                this.panelEventTrigger(event.target.value);
            },
            styles: {
                colStyle: this.props.colStyle,
                minHeight: this.props.userHeight
            }
        };

        getAll(this.state.database).then((datas) => {
            let values = datas.map((data) => {
                    Reflect.deleteProperty(data, 'meta');

                    return data;
                }),
                headers = Object.keys(values[0]).filter((key) => {
                    return (this.props.widgetContent.columns).includes(key);
                });

            headers.includes('id') ? null : headers.push('id');
            this.setState({ DatabaseTable: { ...this.state.DatabaseTable, headers, values } });
        });
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
            break;
        case 'remove':
            this.props.deleteWidget(thisWidgetPosition);
            break;
        default:
            break;
        }
    }

    render() {
        return <DatabaseWidgetView
            WidgetConfigs={this.state}
            WidgetStyles={{ colStyle: this.state.styles.colStyle, minHeight: this.state.styles.minHeight }}
        />;
    }
}
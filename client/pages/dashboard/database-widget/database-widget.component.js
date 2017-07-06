import React from 'react';
import { DatabaseWidgetView } from './database-widget.view';
import { getAll } from './database-widget.services';
import { connect } from 'react-redux';

import { WidgetSetting } from '../widget-setting/widget-setting.component';

@connect(state => ({ databaseWidget: state.databaseWidget }))
export class DatabaseWidget extends React.Component {
    constructor(props) {
        super(props);

        this.init();
    }

    init = () => {
        this.state = {
            type: 'DATABASE_WIDGET',
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
            },
            isSetting: false
        };

        this.getDataAndSetState(this.props.widgetContent.source, this.props.widgetContent.columns);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            styles: {
                colStyle: nextProps.colStyle,
                minHeight: nextProps.userHeight
            },
            title: nextProps.widgetTitle,
            widgetMode: nextProps.widgetMode,
            database: nextProps.widgetContent.source
        });

        this.getDataAndSetState(nextProps.widgetContent.source, nextProps.widgetContent.columns);
    }

    getDataAndSetState = (database, columns) => {
        getAll(database).then((datas) => {
            let values = datas.map((data) => {
                    Reflect.deleteProperty(data, 'meta');

                    return data;
                }),
                headers = Object.keys(values[0]).filter((key) => {
                    return (columns).includes(key);
                });

            headers.includes('id') ? null : headers.push('id');
            this.setState({ DatabaseTable: { ...this.state.DatabaseTable, headers, values } });
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
                        source: this.state.database,
                        columns: this.state.DatabaseTable.headers
                    },
                    onCancel: () => {
                        this.setState({ isSetting: false });
                    }
                }}
            /> :
            <DatabaseWidgetView
                WidgetConfigs={this.state}
                WidgetStyles={{ colStyle: this.state.styles.colStyle, minHeight: this.state.styles.minHeight }}
            />;
    }
}
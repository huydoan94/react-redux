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

    init = () => {
        this.state = {
            title: 'Database Widget',
            mode: 'editMode',
            DatabaseTable: {
                headers: ["id", "None", "None"],
                values: []
            },
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

        getAll().then((datas) => {
            let values = datas.map((data) => {
                Reflect.deleteProperty(data, 'meta');

                return data;
            });
            let headers = Object.keys(values[0]);

            this.setState({DatabaseTable: {...this.state.DatabaseTable, headers, values}});
        });
    }

    render() {
        return <DatabaseWidgetView
            WidgetConfigs={this.state}
            WidgetStyles={{colStyle: this.props.colStyle, minHeight: this.props.userHeight}}
        />;
    }
}
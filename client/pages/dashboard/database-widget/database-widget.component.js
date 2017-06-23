import React from 'react';
import { DatabaseWidgetView } from './database-widget.view';
import { getAll } from './database-services';

export class DatabaseWidget extends React.Component {
    constructor(props) {
        super(props);

        this.init();
    }

    init = () => {
        this.WidgetType = {
            title: 'Database Widget',
            mode: 'editMode'
        };

        this.state = {
            DatabaseTable: {
                headers: ["id", "None", "None"],
                values: []
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
            WidgetType={this.WidgetType}
            DatabaseTable={this.state.DatabaseTable}
            colStyle={this.props.colStyle}
        />;
    }
}
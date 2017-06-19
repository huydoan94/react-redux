import React from 'react';
import { DatabaseWidgetView } from './database-widget.view';

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

        this.EditWidgetValues = {
            placeholder: 'New Widget',
            label: 'Widget title: '
        };
    }

    render() {
        return <DatabaseWidgetView
            WidgetType={this.WidgetType}
            EditWidgetValues={this.EditWidgetValues}
        />;
    }
}
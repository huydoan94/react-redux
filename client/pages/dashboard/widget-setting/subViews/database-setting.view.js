import React, { Component } from 'react';
import { Select } from '../../../../components/select';

import {DatabaseColumns} from '../../../dashboard/components/databaseColumns';

export class DatabaseSettingView extends Component {
    constructor(props) {
        super(props);

        this.props.propsChanged('Contacts');
    }

    WidgetSelector = {
        label: 'Data source:',
        options: [
            {
                id: 0,
                type: 'Contacts'
            },
            {
                id: 1,
                type: 'Stock'
            },
            {
                id: 2,
                type: 'Tasks'
            }],
        events: {
            onSelectorChange: (event) => {
                this.props.propsChanged(event.target.value);
            }
        }
    }

    DatabaseColumns = {
        title: 'Colums:',
        columns: ['ID', 'Email', 'Phone']
    }

    SelectedColumns = {
        title: 'Selected colums:',
        columns: ['Name', 'Title']
    }

    render() {
        return (
            <div>
                <Select WidgetSelector={this.WidgetSelector} />
                <div>
                    <DatabaseColumns databaseColumns={this.DatabaseColumns} />
                    <DatabaseColumns databaseColumns={this.SelectedColumns} />
                </div>
            </div>
        );
    }
}
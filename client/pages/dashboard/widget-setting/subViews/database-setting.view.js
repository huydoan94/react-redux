import React, { Component } from 'react';
import { Select } from '../../../../components/select';

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

    render() {
        return (
            <div>
                <Select WidgetSelector={this.WidgetSelector} />
            </div>
        );
    }
}
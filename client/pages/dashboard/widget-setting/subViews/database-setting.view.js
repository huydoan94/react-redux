import React, { Component } from 'react';
import { Select } from '../../../../components/select';

export class DatabaseSettingView extends Component {
    constructor(props) {
        super(props);

        this.WidgetSelector = {
            label: 'Data source:',
            options: [
                {
                    id: 0,
                    type: 'Text'
                },
                {
                    id: 1,
                    type: 'Database'
                },
                {
                    id: 2,
                    type: 'Org Chart'
                }],
            events: {
                onSelectorChange: (event) => {
                    console.log(event.target.value);
                }
            }
        };
    }
    render() {
        return (
            <div>
                <Select WidgetSelector={this.WidgetSelector} />
            </div>
        );
    }
}
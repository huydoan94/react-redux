import React, { Component } from 'react';
import { Select } from '../../../../components/select';

export class OrgChartSettingView extends Component {
    WidgetSelector = {
        label: 'Root contact:',
        options: [
            {
                id: 0,
                type: 'Texts'
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
    }

    render() {
        return (
            <div>
                <Select WidgetSelector={this.WidgetSelector} />
            </div>
        );
    }
}
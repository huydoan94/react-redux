import React, { Component } from 'react';
import { Select } from '../../../../components/select';

import { getAll } from './../../orgchart-widget/orgchart-widget.services';

export class OrgChartSettingView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            label: 'Root contact:',
            rootContactId: 0,
            options: [
                {
                    id: 0,
                    type: 'None'
                }],
            events: {
                onSelectorChange: (event) => {
                    const firstElement = 0,
                        contact = this.state.options.filter((option) =>
                            option.type === event.target.value)[firstElement];

                    this.setState({
                        rootContactId: contact.id
                    });

                    this.props.onSettingConfigsChange(contact.id);
                }
            }
        };

        this.getAllContact();
    }

    getAllContact = () => {
        getAll().then((datas) => {
            const firstElement = 0;
            let allContactsOption = datas.map((data) => {
                return {
                    id: data.id,
                    type: `${data.firstName} ${data.lastName}`,
                    selected: this.props.initialContent ?
                        this.props.initialContent.widgetContent.root === data.id : false
                };
            });

            this.props.onSettingConfigsChange(datas[firstElement].id);

            this.setState({
                rootContactId: datas[firstElement].id,
                options: allContactsOption
            });
        });
    }

    render() {
        return (
            <div>
                <Select WidgetSelector={this.state} />
            </div>
        );
    }
}
import React, { Component } from 'react';
import { Select } from '../../../../components/select';

import { DatabaseColumns } from '../../../dashboard/components/databaseColumns';
import { getAll } from './../../database-widget/database-widget.services';

const firstElement = 0,
    numberOfElements = 1;

export class DatabaseSettingView extends Component {
    constructor(props) {
        super(props);

        this.init();
    }

    componentDidMount() {
        this.getAllDbHeader('contacts');
    }

    init() {
        this.state = {
            sourceDatabase: 'contacts',
            availableColumns: {
                title: 'Available Columns:',
                columns: [],
                onSelect: (event) => {
                    const currentId = parseInt((event.target.id).substring('dbColumns'.length), 10);
                    let available = Object.assign({}, this.state.availableColumns),
                        selected = Object.assign({}, this.state.selectedColumns),
                        availableColumns = available.columns,
                        selectedColumns = selected.columns;

                    selectedColumns.push(
                        (availableColumns.splice(currentId, numberOfElements))[firstElement]
                    );
                    available = { ...available, columns: availableColumns };
                    selected = { ...selected, columns: selectedColumns };

                    this.setState({ availableColumns: available, selectedColumns: selected });
                    this.props.onSettingConfigsChange({
                        source: this.state.sourceDatabase,
                        columns: selectedColumns
                    });
                }
            },
            selectedColumns: {
                title: 'Selected columns:',
                columns: [],
                onSelect: (event) => {
                    const currentId = parseInt((event.target.id).substring('dbColumns'.length), 10);
                    let available = Object.assign({}, this.state.availableColumns),
                        selected = Object.assign({}, this.state.selectedColumns),
                        availableColumns = available.columns,
                        selectedColumns = selected.columns;

                    availableColumns.push(
                        (selectedColumns.splice(currentId, numberOfElements))[firstElement]
                    );
                    available = { ...available, columns: availableColumns };
                    selected = { ...selected, columns: selectedColumns };

                    this.setState({ availableColumns: available, selectedColumns: selected });
                    this.props.onSettingConfigsChange({
                        source: this.state.sourceDatabase,
                        columns: selectedColumns
                    });
                }
            }
        };
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
                type: 'Stocks'
            },
            {
                id: 2,
                type: 'Tasks'
            }],
        events: {
            onSelectorChange: (event) => {
                switch (event.target.value) {
                case 'Contacts':
                    this.getAllDbHeader('contacts');
                    break;
                case 'Stocks':
                    this.getAllDbHeader('stocks');
                    break;
                case 'Tasks':
                    this.getAllDbHeader('tasks');
                    break;
                default:
                    this.getAllDbHeader('contacts');
                    break;
                }
            }
        }
    }

    getAllDbHeader(database) {
        getAll(database).then((datas) => {
            let values = datas.map((data) => {
                    Reflect.deleteProperty(data, 'id');
                    Reflect.deleteProperty(data, 'meta');

                    return data;
                }),
                available = Object.assign({}, this.state.availableColumns),
                selected = Object.assign({}, this.state.selectedColumns),
                availableColumns = available.columns,
                selectedColumns = selected.columns;

            availableColumns = Object.keys(values[firstElement]);
            selectedColumns.length = 0;
            available = { ...available, columns: availableColumns };
            selected = { ...selected, columns: selectedColumns };

            this.setState({
                sourceDatabase: database,
                availableColumns: available,
                selectedColumns: selected
            });

            this.props.onSettingConfigsChange({
                source: database,
                columns: selectedColumns
            });
        });
    }

    render() {
        return (
            <div>
                <Select WidgetSelector={this.WidgetSelector} />
                <div style={{ display: 'flex' }}>
                    <DatabaseColumns databaseColumns={this.state.availableColumns} />
                    <DatabaseColumns databaseColumns={this.state.selectedColumns} />
                </div>
            </div>
        );
    }
}
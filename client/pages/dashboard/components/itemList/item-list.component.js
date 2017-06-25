import React, { Component } from 'react';

import {ItemListView} from './item-list.view';

export class ItemList extends Component {
    render() {
        return (
            <ItemListView
                items={this.props.items}
                handleDeleteItem={this.props.handleDeleteItem}
                updateNumberActive={this.props.updateNumberActive}
            />
        );
    }
}
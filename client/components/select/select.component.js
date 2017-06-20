import React, { Component } from 'react';

import { SelectView } from './select.view';

export class Select extends Component {
    render() {
        return (
            <SelectView WidgetSelector={this.props.WidgetSelector} />
        );
    }

}

import React, { Component } from 'react';
import RichTextEditor from 'react-rte';

export class TextSettingView extends Component {
    state = {
        value: RichTextEditor.createEmptyValue()
    }

    onChange = (value) => {
        this.setState({ value });
        if (this.props.onChange) {
            this.props.onChange(
                value.toString('html')
            );
        }
    };

    render() {
        return (
            <div>
                <div className="form-group">
                    <label>Text Content:</label>
                </div>
                <RichTextEditor
                    value={this.state.value}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}
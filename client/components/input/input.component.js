import React from 'react';
import InputView from './input.view';

export class Input extends React.Component {

    render() {
        return <InputView
                    inputDetail={this.props.inputAtrribute}
                    getInputValue={this.props.getInputValue}
                    onEnter={this.props.onEnter}
                />;
    }
}

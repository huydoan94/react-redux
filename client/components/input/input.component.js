import React from 'react';
import InputView from './input.view';

export class Input extends React.Component {

    render() {
        return <InputView
            inputAtrribute={this.props.inputAtrribute}
            inputValue={this.props.inputValue}
            onEnter={this.props.onEnter}
        />;
    }
}

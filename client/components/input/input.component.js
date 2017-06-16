import React from 'react';
import InputView from './input.view';

class Input extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <InputView inputDetail={this.props.inputAtrribute} getInputValue={this.props.getInputValue}/>;
    }
}

export default Input;
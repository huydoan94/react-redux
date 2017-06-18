import React, { Component } from 'react';

import cssModules from 'react-css-modules';
import style from './input.style.scss';

let inputDetail = {};

class InputView extends Component {
    constructor(props) {
        super(props);

        inputDetail = this.props.inputDetail;
    }

    onInputChange = () => {
        const ref = this.refs.inputRef;

        if (this.props.getInputValue) {
            if (ref) {
                this.props.getInputValue(ref);
            }
        }
    }

    hanleKeyPress = (e) => {
        if (this.props.onEnter) {
            if (e.key === 'Enter') {
                const ref = this.refs.inputRef;

                if (ref) {
                    this.props.onEnter(ref);
                }
            }
        }
    }

    render = cssModules(() => {
        return (
            <div className="form-group">
                <label className="control-label">{inputDetail.label}</label>
                <input
                    styleName={inputDetail.inputClass ? inputDetail.inputClass : 'simpleInput'}
                    type={inputDetail.type}
                    placeholder={inputDetail.placeholder}
                    ref="inputRef"
                    onChange={this.onInputChange}
                    onKeyPress={this.hanleKeyPress}
                />
            </div>
        );
    }, style);
}

// InputView.propTypes = {
//     type: PropTypes.string.isRequired,
//     placeholder: PropTypes.string,
//     label: PropTypes.string,
//     value: PropTypes.string,
//     inputClass: PropTypes.string
// };

// InputView.defaultProps = {
//     type: 'text',
//     placeholder: '',
//     label: '',
//     value: '',
//     inputClass: 'simpleInput'
// };

export default InputView;

import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import style from './input.style.scss';

class InputView extends Component {
    constructor(props) {
        super(props);

        this.inputAtrribute = this.props.inputAtrribute;
    }

    onInputChange = (event) => {
        const ref = this.refs.inputRef;

        if (this.props.inputValue) {
            if (ref) {
                this.props.inputValue(ref);
            }
        }
    }

    onKeyPress = (event) => {
        if (this.props.onEnter) {
            if (event.key === 'Enter') {
                const ref = this.refs.inputRef;

                if (ref) {
                    this.props.onEnter(ref);
                }
            }
        }
    }

    render = cssModules(() => {
        const { type, placeholder, inputClass, label } = this.inputAtrribute;

        return (
            <div className="form-group">
                <label className="control-label">{label}</label>
                <input
                    type={type}
                    placeholder={placeholder}
                    styleName={inputClass ? inputClass : 'simpleInput'}
                    onChange={this.onInputChange}
                    onKeyPress={this.onKeyPress}
                    ref="inputRef"
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

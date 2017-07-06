import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import style from './input.style.scss';

export class Input extends Component {
    onInputChange = () => {
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
        const { type, placeholder, inputClass, label, value } = this.props.inputAtrribute;

        return (
            <div className="form-group">
                <label styleName="control-label">{label}</label>
                <input
                    type={type}
                    placeholder={placeholder}
                    styleName={inputClass ? inputClass : 'simpleInput'}
                    onChange={this.onInputChange}
                    onKeyPress={this.onKeyPress}
                    ref="inputRef"
                    defaultValue={value}
                />
            </div>
        );
    }, style);
}
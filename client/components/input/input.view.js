import React, { PropTypes, Component }  from 'react';

import './input.style.scss';

let inputDetail = {};
class InputView extends Component {
    constructor(props) {
        super(props);

        inputDetail = this.props.inputDetail;
    }

    onInputChange = () => {
      const ref = this.refs.inputRef;
      if(this.props.getInputValue) {
          if(ref) {
            this.props.getInputValue(ref);
          }
      }
    }

    render() {
      return ( 
          <div className="form-group">
              <label className="control-label">{inputDetail.label}</label>
              <input 
                className="simpleInput"
                type={inputDetail.type} 
                placeholder={inputDetail.placeholder} 
                ref="inputRef" 
                onChange={this.onInputChange}
                />
          </div>
      );
    }
}

InputView.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string
}

InputView.defaultProps = {
  type: 'text',
  placeholder: '',
  label: '',
  value: ''
}

export default InputView;

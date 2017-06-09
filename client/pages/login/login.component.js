import React from 'react';
import {LoginView} from './login.view';
import {connect} from 'react-redux';
import validateInput from './login.validator';

@connect(state => ({login: state.login}))
export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {},
            isLoading: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    isValid() {
        const {errors, isValidated} = validateInput(this.state);

        if (!isValidated) {
            this.setState({errors});
        }
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {

        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return <LoginView loginState={this.state}
                          onChange={this.onChange}
                          onSubmit={this.onSubmit}/>;
    }
}

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginRequest } from './login.action';
import LoginView from './login.view';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;

        this.dispatch = dispatch;

        this.inputUsername = {
            type: 'text',
            placeholder: 'Username',
            value: ''
        };

        this.inputPassword = {
            type: 'text',
            placeholder: 'Password',
            value: ''
        };
    }

    LoginClick = (ref) => {
        let account = {
            username: this.inputUsername.value,
            password: this.inputPassword.value
        };

        this.dispatch(loginRequest(account));
    }

    setUsername = (ref) => {
        this.inputUsername.value = ref.value;
    }

    setPassword = (ref) => {
        this.inputPassword.value = ref.value;
    }

    render() {
        return (
            <LoginView
                inputUsername={this.inputUsername}
                inputPassword={this.inputPassword}
                setUsername={this.setUsername}
                setPassword={this.setPassword}
                onLoginClick={this.LoginClick}
            />
        );
    }
}

export default connect()(LoginForm);

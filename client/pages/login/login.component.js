import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { loginRequest } from './login.action';
import { LoginView } from './login.view';

@connect(state => ({ login: state.login }))
export class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;

        this.dispatch = dispatch;

        this.inputUsername = {
            type: 'text',
            placeholder: 'Username',
            value: '',
            inputClass: 'input-custom'
        };

        this.inputPassword = {
            type: 'text',
            placeholder: 'Password',
            value: '',
            inputClass: 'input-custom'
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
        if (sessionStorage.getItem('jwtToken')) {
            browserHistory.push('/dashboard');
        }

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
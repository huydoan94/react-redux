import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { loginRequest } from './login.action';
import { LoginView } from './login.view';

@connect(state => ({ login: state.login }))
export class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jwtToken: sessionStorage.getItem('jwtToken'),
            error: null
        };

        this.inputUsername = {
            type: 'text',
            placeholder: 'Username',
            value: '',
            inputClass: 'input-custom'
        };

        this.inputPassword = {
            type: 'password',
            placeholder: 'Password',
            value: '',
            inputClass: 'input-custom'
        };

        if (sessionStorage.getItem('jwtToken')) {
            browserHistory.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            jwtToken: nextProps.login.jwtToken,
            error: nextProps.login.error
        });

        if (nextProps.login.jwtToken) {
            sessionStorage.setItem('jwtToken', nextProps.login.jwtToken);
            browserHistory.push('/dashboard');
        }
    }

    LoginClick = () => {
        let account = {
            username: this.inputUsername.value,
            password: this.inputPassword.value
        };

        this.props.dispatch(loginRequest(account));
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
                error={this.state.error}
            />
        );
    }
}
import React from 'react';
import {connect} from 'react-redux';
import {LoginView} from './login.view';
import {login} from './login.action';
import validateInput from './login.validator';
import {browserHistory} from 'react-router';

@connect(state => ({login: state.login}))
export class Login extends React.Component {

    constructor(props) {
        super(props);

        if (sessionStorage.getItem('jwtToken') !== null) {
            browserHistory.push('/dashboard');
        }

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

        return isValidated;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errros: {}, isLoading: true});
            login(this.state).then((res) => {
                browserHistory.push('/dashboard');
            }).catch((err) => {
                this.setState({errors: {form: 'Invalid Credentials'}, isLoading: false});
            });
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

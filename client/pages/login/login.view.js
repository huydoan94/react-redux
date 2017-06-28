import React from 'react';
import cssModules from 'react-css-modules';

import style from './login.style.scss';
import { Input } from '../../components/input';

export const LoginView = cssModules(({ inputUsername, inputPassword, setUsername, setPassword, onLoginClick }) => {
    return (
        <div styleName='login-wrapper'>
            <h2 styleName='login-title'>Login to Your Account</h2>
            <Input inputAtrribute={inputUsername} inputValue={setUsername}/>
            <Input inputAtrribute={inputPassword} inputValue={setPassword} />
            <button styleName='btn-login' onClick={onLoginClick}>Login</button>
        </div>
    );
}, style);
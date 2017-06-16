import React, { PropTypes } from 'react';
import Input from '../../components/input/input.component';

const LoginView = ({inputUsername, inputPassword, setUsername, setPassword, onLoginClick}) => {
    return ( 
        <div>
            <h2>Login to Your Account</h2>
            <Input inputAtrribute={inputUsername} getInputValue={setUsername}/>
            <Input inputAtrribute={inputPassword} getInputValue={setPassword}/>
            <button onClick={onLoginClick}>Login</button>
        </div>
    );
};

export default LoginView;
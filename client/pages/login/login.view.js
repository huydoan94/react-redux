import React from 'react';
import { Input } from '../../components/input';

export const LoginView = ({ inputUsername, inputPassword, setUsername, setPassword, onLoginClick }) => {
    return (
        <div>
            <h2>Login to Your Account</h2>
            <Input inputAtrribute={inputUsername} inputValue={setUsername} />
            <Input inputAtrribute={inputPassword} inputValue={setPassword} />
            <button onClick={onLoginClick}>Login</button>
        </div>
    );
};
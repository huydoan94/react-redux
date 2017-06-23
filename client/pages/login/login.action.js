import { login } from './login.service';

const loginAction = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS'
};

const objectifier = (type, loginData) => {
    return {
        type,
        loginData
    };
};

export const loginRequest = (account) => (dispatch) => {
    login(account).then((response) => {
        const token = response.token;

        sessionStorage.setItem('jwtToken', token);
        dispatch(objectifier(loginAction.LOGIN_SUCCESS, token));
    });
};
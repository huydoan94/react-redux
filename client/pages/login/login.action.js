import { login } from './login.service';

const loginAction = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL'
};

const objectifier = (type, loginData) => {
    return { type, loginData };
};

export const loginRequest = (account) => (dispatch) => {
    login(account).then((response) => {
        dispatch(objectifier(loginAction.LOGIN_SUCCESS, response.token));
    }).catch(() => {
        dispatch(objectifier(loginAction.LOGIN_FAIL));
    });
};
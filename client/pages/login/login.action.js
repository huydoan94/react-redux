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
        dispatch(objectifier(loginAction.LOGIN_SUCCESS, {token: response.token, error: null}));
    }).catch((error) => {
        const wrongAuthenticationData = 'Error: 401';
        let errorMessage = '';

        if (error.toString() === wrongAuthenticationData) {
            errorMessage = `Invalid Username Or Password !`;
        } else {
            errorMessage = error.toString();
        }
        dispatch(objectifier(loginAction.LOGIN_FAIL, {token: null, error: errorMessage}));
    });
};
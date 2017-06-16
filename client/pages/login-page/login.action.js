import {login} from './login.service';

const loginAction = () => {
    return {
        type: 'login'
    };
}

export const loginRequest = (account) => (dispatch) => {
    login(account).then((response) => {
        console.log(response);
        dispatch(loginAction);
    });
}
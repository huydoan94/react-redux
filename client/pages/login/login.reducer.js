export const loginPage = (state = {}, action) => {
    switch (action.type) {
    case 'LOGIN_SUCCESS':
        return { ...state, jwtToken: action.loginData };
    default:
        return state;
    }
};

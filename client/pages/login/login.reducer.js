export const login = (state = {}, action) => {
    switch (action.type) {
    case 'LOGIN_SUCCESS':
        return { ...state, jwtToken: action.loginData.token, error: action.loginData.error };
    case 'LOGIN_FAIL':
        return { ...state, jwtToken: action.loginData.token, error: action.loginData.error };
    default:
        return state;
    }
};

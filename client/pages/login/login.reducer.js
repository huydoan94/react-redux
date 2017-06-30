export const login = (state = {}, action) => {
    switch (action.type) {
    case 'LOGIN_SUCCESS':
        return { ...state, jwtToken: action.loginData, error: null };
    case 'LOGIN_FAIL':
        return { ...state, jwtToken: null, error: 'Invalid username or password' };
    default:
        return state;
    }
};

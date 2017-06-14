export const SET_CURRENT_USER = 'SET_CURRENT_USER';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
    case SET_CURRENT_USER:
        return {
            isAuthenticated: true,
            user: action.user
        };
    default:
        return state;
    }
};

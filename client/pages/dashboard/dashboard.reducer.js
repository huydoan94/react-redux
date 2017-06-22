export const dashboard = (state = {}, action) => {
    console.log(action);
    switch (action.type) {
    case 'DASHBOARD_FETCH':
        return action.dashboardsData;
    default:
        return state;
    }
};

export const dashboard = (state = {}, action) => {
    switch (action.type) {
    case 'DASHBOARD_FETCH':
        return action.dashboardsData;
    case 'DASHBOARD_CHANGE_LAYOUT':
        return { ...state, layoutColumn: action.dashboardsData };
    default:
        return state;
    }
};

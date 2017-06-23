import { getByUserId, updateLayout } from './dashboard.service';

const DashboardAction = {
    DASHBOARD_CREATION: 'DASHBOARD_CREATION',
    DASHBOARD_FETCH: 'DASHBOARD_FETCH',
    DASHBOARD_CHANGE_LAYOUT: 'DASHBOARD_CHANGE_LAYOUT'
};

const objectifier = (type, dashboardsData) => {
    return { type, dashboardsData };
};

const firstElement = 0;

export const createDashboard = () => {
    return {
        type: DashboardAction.DASHBOARD_CREATION
    };
};

export const fetchDashboard = (userId) => (dispatch) => {
    return getByUserId(userId).then((result) => {
        dispatch(objectifier(DashboardAction.DASHBOARD_FETCH, result[firstElement]));
    });
};

export const changeLayout = (layoutColumn, dashboardId) => (dispatch) => {
    return updateLayout(layoutColumn, dashboardId).then((result) => {
        dispatch(objectifier(DashboardAction.DASHBOARD_CHANGE_LAYOUT, result.layoutColumn));
    });
};

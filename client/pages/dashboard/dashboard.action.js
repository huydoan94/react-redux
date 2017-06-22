import { getByUserId } from './dashboard.service';

const DashboardAction = {
    DASHBOARD_CREATION: 'DASHBOARD_CREATION',
    DASHBOARD_FETCH: 'DASHBOARD_FETCH'
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

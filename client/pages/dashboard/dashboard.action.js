import { getByUserId, updateLayout, updateDashboardWidgets } from './dashboard.service';

const DashboardAction = {
    DASHBOARD_CREATION: 'DASHBOARD_CREATION',
    DASHBOARD_FETCH: 'DASHBOARD_FETCH',
    DASHBOARD_CHANGE_LAYOUT: 'DASHBOARD_CHANGE_LAYOUT',
    DASHBOARD_REMOVE_WIDGET: 'DASHBOARD_REMOVE_WIDGET',
    DASHBOARD_ADD_UPDATE_WIDGET: 'DASHBOARD_ADD_UPDATE_WIDGET'
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

export const removeWidget = (editedWidget, dashboardId) => (dispatch) => {
    return updateDashboardWidgets(editedWidget, dashboardId).then((result) => {
        dispatch(objectifier(DashboardAction.DASHBOARD_REMOVE_WIDGET, result.widgets));
    });
};

export const addOrUpdateWidget = (editedWidget, dashboardId) => (dispatch) => {
    return updateDashboardWidgets(editedWidget, dashboardId).then((result) => {
        dispatch(objectifier(DashboardAction.DASHBOARD_ADD_UPDATE_WIDGET, result.widgets));
    });
};

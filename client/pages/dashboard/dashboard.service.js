import { interactWithServer } from './../../core/database-handler';

const URL = 'http://localhost:8080/api/dashboards';

export const getAll = () => {
    return interactWithServer(URL, 'GET');
};

export const getByUserId = (userId) => {
    return interactWithServer(`${URL}/search`, 'POST', { userId });
};

export const updateLayout = (layoutColumn, dashboardId) => {
    return interactWithServer(`${URL}/${dashboardId}`, 'PUT', { layoutColumn });
};

export const updateDashBoard = (dashboardId, widgets) => {
    return interactWithServer(`${URL}/edit/widget`, 'PUT', { dashboardId, widgets});
};

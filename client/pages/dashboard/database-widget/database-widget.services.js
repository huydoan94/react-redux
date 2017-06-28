import { interactWithServer } from './../../../core/database-handler';

const URL = 'http://localhost:8080/api';

export const getAll = (database) => {
    return interactWithServer(`${URL}/${database}`, 'GET');
};
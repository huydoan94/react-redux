import { interactWithServer } from './../../../core/database-handler';

const URL = 'http://localhost:8080/api/contacts';

export const getAll = () => {
    return interactWithServer(URL, 'GET');
};
import { interactWithServer } from './../../../core/database-handler';

const URL = 'http://localhost:8080/api/tasks';

export const getAll = () => {
    return interactWithServer(URL, 'GET');
};

export const add = (todo) => {
    return interactWithServer(URL, 'POST', todo);
};

export const filter = (condition) => {
    return interactWithServer(`${URL}/search`, 'POST', condition);
};


export const update = (id, condition) => {
    return interactWithServer(`${URL}/${id}`, 'PUT', condition);
};

export const deleteItem = (id) => {
    return interactWithServer(`${URL}/${id}`, 'DELETE');
};
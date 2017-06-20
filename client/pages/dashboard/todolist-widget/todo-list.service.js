const URL = 'http://localhost:8080/api/tasks';

const interactWithServer = (url, method, data) => {
    const request = {};

    request.headers = { 'Content-Type': 'application/json' };
    request.method = method;
    if (data) {
        request.body = JSON.stringify(data);
    }

    return new Promise((success, reject) => {
        fetch(
            url,
            request
        ).then((response) => {
            if (!response.ok) {
                throw Error(response.status);
            }

            return response.json();
        }).then((result) => {
            success(result);
        }).catch((error) => {
            reject(error);
        });
    });
};

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
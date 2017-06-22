const URL = 'http://localhost:8080/api/dashboards';

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

export const getByUserId = (userId) => {
    return interactWithServer(`${URL}/search`, 'POST', {userId});
};
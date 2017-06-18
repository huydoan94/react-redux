const URL = 'http://localhost:8080/api/tasks';

export const getAll = () => {
    return new Promise((resolve, reject) => {
        fetch(
            `${URL}/`,
            { method: 'GET' }
        ).then((response) => {
            return response.json();
        }).then((todoList) => {
            resolve(todoList);
        }).catch(() => {
            reject('error');
        });
    });
};

export const add = (todo) => {
    return new Promise((resolve, reject) => {
        fetch(
            `${URL}/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(todo)
            }
        ).then((response) => {
            return response.json();
        }).then((todoObj) => {
            resolve(todoObj);
        }).catch(() => {
            reject('error');
        });
    });
};

export const fillter = (condition) => {
    return new Promise((resolve, reject) => {
        fetch(
            `${URL}/_search`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(condition)
            }
        ).then((response) => {
            return response.json();
        }).then((todos) => {
            resolve(todos);
        }).catch(() => {
            reject('error');
        });
    });
};


export const update = (id, condition) => {
    return new Promise((resolve, reject) => {
        fetch(
            `${URL}/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(condition)
            }
        ).then((response) => {
            return response.json();
        }).then((todo) => {
            resolve(todo);
        }).catch(() => {
            reject('error');
        });
    });
};

export const deleteItem = (id) => {
    return new Promise((resolve, reject) => {
        fetch(
            `${URL}/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE'
            }
        ).then((response) => {
            return response.json();
        }).then((todo) => {
            resolve(todo);
        }).catch(() => {
            reject('error');
        });
    });
};
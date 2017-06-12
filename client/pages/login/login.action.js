export function login(datas) {
    return new Promise((res, err) => {
        fetch('http://localhost:8080/api/accounts/login', {
            method: 'POST',
            contentType: 'application/json',
            body: JSON.stringify(datas)
        }).then((resp) => {
            return resp.json();
        }).then((data) => {
            res(data);
        }).catch((error) => {
            err(error);
        });
    });
}

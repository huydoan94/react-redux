export function login(datas) {
    return new Promise((res, err) => {
        fetch('http://localhost:8080/api/accounts/login', {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json',
                'authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
            }),
            body: JSON.stringify(datas)
        }).then((response) => {
            if (!response.ok) {
                throw response.statusText;
            }

            return response.json();
        }).then((result) => {
            const token = result.token;

            sessionStorage.setItem('jwtToken', token);
            res(result);
        }).catch((error) => {
            err(error);
        });
    });
}

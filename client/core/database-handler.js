export const interactWithServer = (url, method, data) => {
    const jwtToken = sessionStorage.getItem('jwtToken');
    const request = {
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
        },
        method
    };

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
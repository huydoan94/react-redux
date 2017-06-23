import { interactWithServer } from './../../core/database-handler';

const URL = 'http://localhost:8080/api/accounts/login';

export const login = (account) => {
    return interactWithServer(URL, 'POST', account);
};
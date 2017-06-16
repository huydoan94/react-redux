import {combineReducers} from 'redux';
import {dashboard, loginPage} from './pages';

export const AppReducer = combineReducers({
    dashboard,
    loginPage
});

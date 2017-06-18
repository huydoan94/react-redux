import {combineReducers} from 'redux';
import {dashboard, loginPage} from './pages';
import {todos} from './pages/todolist-widget';

export const AppReducer = combineReducers({
    dashboard,
    loginPage,
    todos
});

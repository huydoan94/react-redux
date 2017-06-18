import { combineReducers } from 'redux';
import { dashboard, loginPage } from './pages';
import { todos } from './pages/dashboard/todolist-widget';

export const AppReducer = combineReducers({
    dashboard,
    loginPage,
    todos
});

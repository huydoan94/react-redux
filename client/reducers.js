import { combineReducers } from 'redux';
import { dashboard, login } from './pages';
import { todos } from './pages/dashboard/todolist-widget';

export const AppReducer = combineReducers({
    dashboard,
    login,
    todos
});

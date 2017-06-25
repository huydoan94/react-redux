import { getAll, getOne, add, filter, update, deleteItem } from './todolist-widget.service';
import {remove} from 'lodash';

const notfound = -1;

const returnTodos = (type, todos) => {
    return { type, todos };
};

const filterData = (resultFromDB, listId, widget) => {
    let data = [];

    resultFromDB.forEach((todo) => {
        const index = listId.findIndex((id) => id === parseInt(todo.id, 10));

        if (index > notfound) {
            data = [...data, todo];
        }
    });

    const todos = {
        data,
        widget
    };

    return todos;
};

export const getAllTodo = (listId, widget) => (dispatch) => {
    return getAll().then((result) => {
        if (listId && widget) {
            dispatch(returnTodos('SHOW_ALL', filterData(result, listId, widget)));
        } else {
            dispatch(returnTodos('SHOW_ALL', result));
        }
    });
};

export const getOneTodo = (todo) => (dispatch) => {
    return getOne(todo.id).then((result) => {
        dispatch(returnTodos('GET_ONE_TODO', result));
    });
};

export const addTodo = (todo, updateListId) => (dispatch) => {
    return add(todo).then((result) => {
        updateListId(result);
        dispatch(returnTodos('ADD_TODO', result));
    });
};

export const filterTodo = (filterType, condition, listId, widget) => (dispatch) => {
    return filter(condition).then((result) => {
        dispatch(returnTodos(filterType, filterData(result, listId, widget)));
    });
};

export const updateTodo = (id, condition) => (dispatch) => {
    return update(id, condition).then((result) => {
        dispatch(returnTodos('UPDATE_TODO', result));
    });
};

export const deleteTodo = (id, tasks, widget) => (dispatch) => {
    return deleteItem(id).then((result) => {
        result.id = id;
        const todos = {
            deletedItem: result,
            data: tasks,
            widget
        };

        dispatch(returnTodos('DELETE_TODO', todos));
    });
};

export const deleteCompletedTodo = (arrayId, tasks, widget) => (dispatch) => {
    arrayId.forEach((Id) => {
        deleteItem(Id).then(() => {});
    });
    let temp = tasks.slice();

    arrayId.forEach((id) => remove(temp, (e) => parseInt(e.id, 10) === parseInt(id, 10)));
    const todos = {
        data: temp,
        widget
    };

    dispatch(returnTodos('DELETE_MULTI_TODO', todos));
};

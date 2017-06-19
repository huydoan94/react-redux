import { getAll, add, filter, update, deleteItem } from './todo-list.service';

const returnTodos = (type, todos) => {
    return { type, todos };
};

// ==============================================SHOW ALL====================================

export const getAllTodo = () => (dispatch) => {
    return getAll().then((result) => {
        dispatch(returnTodos('SHOW_ALL', result));
    });
};

// ======================================================ADD================================
export const addTodo = (todo) => (dispatch) => {
    return add(todo).then((result) => {
        dispatch(returnTodos('ADD_TODO', result));
    });
};

// ============================FILTER==================================================
export const filterTodo = (filterType, condition) => (dispatch) => {
    return filter(condition).then((result) => {
        dispatch(returnTodos(filterType, result));
    });
};

// ===============================UPDATE==============================================
export const updateTodo = (id, condition) => (dispatch) => {
    return update(id, condition).then((result) => {
        dispatch(returnTodos('UPDATE_TODO', result));
    });
};

// =================================DELETE========================================
export const deleteTodo = (id) => (dispatch) => {
    return deleteItem(id).then((result) => {
        result.id = id;
        dispatch(returnTodos('DELETE_TODO', result));
    });
};

// =============================DELETE COMPLETED================================
export const deleteCompletedTodo = (arrayId) => (dispatch) => {
    arrayId.forEach((Id) => {
        deleteItem(Id).then((result) => {
            result.id = Id;
            dispatch(returnTodos('DELETE_TODO', result));
        });
    });
};
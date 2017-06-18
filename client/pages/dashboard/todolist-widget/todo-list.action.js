import { getAll, add, fillter, update, deleteItem } from './todo-list.service';

const returnTodos = (type, todos) => {
    return { type, todos };
};

// ==============================================SHOW ALL====================================

export const getAllTodo = () => (dispatch) => {
    return getAll().then((result) => {
        if (result !== 'error') {
            dispatch(returnTodos('SHOW_ALL', result));
        }
    });
};

// ======================================================ADD================================
export const addTodo = (todo) => (dispatch) => {
    return add(todo).then((result) => {
        if (result !== 'error') {
            dispatch(returnTodos('ADD_TODO', result));
        }
    });
};

// ============================FILLTER==================================================
export const fillterTodo = (fillterType, condition) => (dispatch) => {
    return fillter(condition).then((result) => {
        if (result !== 'error') {
            dispatch(returnTodos(fillterType, result));
        }
    });
};

// ===============================UPDATE==============================================
export const updateTodo = (id, condition) => (dispatch) => {
    return update(id, condition).then((result) => {
        if (result !== 'error') {
            result.id = parseInt(result.id, 10);
            dispatch(returnTodos('UPDATE_TODO', result));
        }
    });
};

// =================================DELETE========================================
export const deleteTodo = (id) => (dispatch) => {
    return deleteItem(id).then((result) => {
        if (result !== 'error') {
            result.id = id;
            dispatch(returnTodos('DELETE_TODO', result));
        }
    });
};

// =============================DELETE COMPLETED================================
export const deleteCompletedTodo = (arrayId) => (dispatch) => {
    arrayId.forEach((Id) => {
        deleteItem(Id).then((result) => {
            if (result !== 'error') {
                result.id = Id;
                dispatch(returnTodos('DELETE_TODO', result));
            }
        });
    });
};
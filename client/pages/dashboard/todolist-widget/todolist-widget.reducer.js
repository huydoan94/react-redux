const notfound = -1;
const pos = 1;

export const todos = (state = [], action) => {
    switch (action.type) {
    case 'SHOW_ALL':
        state = action.todos;

        return state;

    case 'ADD_TODO':
        state = [...state, action.todos];

        return state;

    case 'GET_ONE_TODO':
        state = [...state, action.todos];

        return state;

    case 'SHOW_COMPLETED':
        state = action.todos;

        return state;

    case 'SHOW_ACTIVE':
        state = action.todos;

        return state;

    case 'UPDATE_TODO': {
        let tempState = Object.assign([], state);
        const index = tempState.findIndex((e) => parseInt(e.id, 10) === parseInt(action.todos.id, 10));

        if (index > notfound) {
            tempState[index] = action.todos;
            state = tempState;
        }

        return state;
    }

    case 'DELETE_TODO': {
        let data = action.todos.data;
        const
            deletedItem = action.todos.deletedItem,
            indexItem = data.findIndex((e) => parseInt(e.id, 10) === parseInt(deletedItem.id, 10));

        if (indexItem > notfound) {
            data.splice(indexItem, pos);
        }
        state = {
            data,
            widget: action.todos.widget
        };

        return state;
    }

    case 'DELETE_MULTI_TODO': {
        state = {
            data: action.todos.data,
            widget: action.todos.widget
        };

        return state;
    }

    default:
        return state;
    }
};
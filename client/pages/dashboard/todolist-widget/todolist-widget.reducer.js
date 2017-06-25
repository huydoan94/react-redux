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

    case 'SHOW_COMPLETED':
        state = action.todos;

        return state;

    case 'SHOW_ACTIVE':
        state = action.todos;

        return state;

    case 'UPDATE_TODO': {
        let tempState = Object.assign([], state);
        const index = tempState.findIndex((e) => parseInt(e.id, 10) === action.todos.id);

        if (index > notfound) {
            tempState[index] = action.todos;
            state = tempState;
        }

        return state;
    }

    case 'DELETE_TODO': {
        let temp = state.slice();
        const indexItem = temp.findIndex((e) => e.id === action.todos.id);

        if (indexItem > notfound) {
            temp.splice(indexItem, pos);
            state = temp;
        }

        return state;
    }

    default:
        return state;
    }
};
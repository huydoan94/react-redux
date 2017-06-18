import React from 'react';
import { connect } from 'react-redux';

import { getAllTodo, addTodo, fillterTodo, deleteCompletedTodo } from './todo-list.action';
import { TodoListWidgetView } from './todo-list-widget.view';

const widget = {
    title: 'Todo List Widget',
    mode: 'editMode'
};

let numberCompleted = 0;
let isFillterCompleted = false;

class TodoListWidget extends React.Component {
    constructor(props) {
        super(props);
        this.init();
    }

    init = () => {
        this.inputAddTodo = {
            placeholder: 'What need to be done?'
        };

        this.showAllBtn = {
            buttonContent: 'All',
            onButtonClick: () => {
                isFillterCompleted = false;
                this.dispatch(getAllTodo());
            }
        };

        this.showActiveBtn = {
            buttonContent: 'Active',
            onButtonClick: () => {
                isFillterCompleted = false;
                const type = 'SHOW_ACTIVE';
                const condition = {
                    isCompleted: false
                };

                this.fillterItem(type, condition);
            }
        };

        this.showCompletedBtn = {
            buttonContent: 'Completed',
            onButtonClick: () => {
                isFillterCompleted = true;
                const type = 'SHOW_COMPLETED';
                const condition = {
                    isCompleted: true
                };

                this.fillterItem(type, condition);
            }
        };

        this.clearCompletedBtn = {
            buttonContent: 'Clear Completed',
            onButtonClick: () => {
                const arrayId = this.getCompletedItem();

                this.dispatch(deleteCompletedTodo(arrayId));
            }
        };

        const { dispatch } = this.props;

        this.dispatch = dispatch;
        this.dispatch(getAllTodo());
    }

    fillterItem = (type, condition) => {
        this.dispatch(fillterTodo(type, condition));
    };

    onEnter = (ref) => {
        const task = ref.value;
        let taskObj = {
            task,
            userId: 1,
            isCompleted: false
        };

        this.dispatch(addTodo(taskObj));
    }

    getNumberActive = (tasks) => {
        let count = 0;
        let result = '';

        count = (tasks.filter((task) => !task.isCompleted)).length;

        result = `${count} Item(s) left`;

        return result;
    }

    getCompletedItem = () => {
        const tasks = this.props.todoList;
        let result = [];

        tasks.forEach((task) => {
            if (task.isCompleted) {
                result.push(task.id);
            }
        });

        return result;
    }

    render() {
        const tasks = this.props.todoList;

        if (!isFillterCompleted) {
            numberCompleted = this.getNumberActive(tasks);
        }

        return <TodoListWidgetView
            widget={widget}
            inputAddTodo={this.inputAddTodo}
            onEnter={this.onEnter}
            showAllBtn={this.showAllBtn}
            showActiveBtn={this.showActiveBtn}
            showCompletedBtn={this.showCompletedBtn}
            clearCompletedBtn={this.clearCompletedBtn}
            numberCompleted={numberCompleted}
            tasks={tasks}
        />;
    }
}

const mapStateToProps = (state) => {
    return {
        todoList: state.todos
    };
};

export default connect(mapStateToProps)(TodoListWidget);

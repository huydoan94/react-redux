import React from 'react';
import { connect } from 'react-redux';

import { getAllTodo, addTodo, filterTodo, deleteCompletedTodo } from './todo-list.action';
import { TodoListWidgetView } from './todo-list-widget.view';

let numberCompleted = 0;
let isFilterCompleted = false;

@connect(state => ({ todoList: state.todos }))
export class TodoListWidget extends React.Component {
    constructor(props) {
        super(props);
        this.inititialize();
    }

    inititialize = () => {
        this.widget = {
            title: 'Todo List Widget',
            mode: 'editMode'
        };

        this.inputAddTodo = {
            placeholder: 'What need to be done?'
        };

        this.showAllBtn = {
            attribute: {
                buttonContent: 'All',
                buttonStyle: 'simple-button'
            },
            event: {
                onButtonClick: () => {
                    isFilterCompleted = false;
                    this.dispatch(getAllTodo());
                }
            }
        };

        this.showActiveBtn = {
            attribute: {
                buttonContent: 'Active',
                buttonStyle: 'simple-center-button'
            },
            event: {
                onButtonClick: () => {
                    isFilterCompleted = false;
                    let type = 'SHOW_ACTIVE';
                    let condition = {
                        isCompleted: false
                    };

                    this.filterItem(type, condition);
                }
            }
        };

        this.showCompletedBtn = {
            attribute: {
                buttonContent: 'Completed',
                buttonStyle: 'simple-button'
            },
            event: {
                onButtonClick: () => {
                    isFilterCompleted = true;
                    let type = 'SHOW_COMPLETED';
                    let condition = {
                        isCompleted: true
                    };

                    this.filterItem(type, condition);
                }
            }
        };

        this.clearCompletedBtn = {
            attribute: {
                buttonContent: 'Clear Completed',
                buttonStyle: 'no-border-button'
            },
            event: {
                onButtonClick: () => {
                    let arrayId = this.getCompletedItem();

                    this.dispatch(deleteCompletedTodo(arrayId));
                }
            }
        };

        let { dispatch } = this.props;

        this.dispatch = dispatch;
        this.dispatch(getAllTodo());
    }

    filterItem = (type, condition) => {
        this.dispatch(filterTodo(type, condition));
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

        if (!isFilterCompleted) {
            numberCompleted = this.getNumberActive(tasks);
        }

        return <TodoListWidgetView
            widget={this.widget}
            inputAddTodo={this.inputAddTodo}
            onEnter={this.onEnter}
            showAllBtn={this.showAllBtn}
            showActiveBtn={this.showActiveBtn}
            showCompletedBtn={this.showCompletedBtn}
            clearCompletedBtn={this.clearCompletedBtn}
            numberCompleted={numberCompleted}
            tasks={tasks}
            colStyle={this.props.colStyle}
        />;
    }
}

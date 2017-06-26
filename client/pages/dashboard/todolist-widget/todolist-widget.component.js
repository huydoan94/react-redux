import React from 'react';
import { connect } from 'react-redux';
import { remove } from 'lodash';

import { getAllTodo, addTodo, filterTodo, deleteTodo, deleteCompletedTodo } from './todolist-widget.action';
import { TodoListWidgetView } from './todolist-widget.view';

const empty = -1;
let isFilterCompleted = false;

@connect(state => ({ todoList: state.todos }))
export class TodoListWidget extends React.Component {
    constructor(props) {
        super(props);
        this.inititialize();
    }

    inititialize = () => {
        let { dispatch } = this.props;

        this.dispatch = dispatch;
        this.state = {
            listId: this.props.widgetContent,
            position: this.props.position,
            panelEvent: (event) => {
                let thisWidgetPosition = parseInt((this.props.id).substring('widgetPos_'.length), 10);

                switch (event.target.value) {
                case 'fullscreen':
                    break;
                case 'setting':
                    break;
                case 'remove':
                    this.props.deleteWidget(thisWidgetPosition);
                    break;
                default:
                    break;
                }
            }
        };

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
                    this.dispatch(getAllTodo(this.state.listId, this.state.position));
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

                    this.dispatch(deleteCompletedTodo(arrayId, this.state.tasksLocal, this.state.position));
                    this.props.updateTodoItemInDashboard(this.state.position, arrayId, 'delete_multi_todo');
                }
            }
        };

        this.dispatch(getAllTodo());
    }

    filterItem = (type, condition) => {
        this.dispatch(filterTodo(type, condition, this.state.listId, this.state.position));
    };

    updateListId = (newTodo) => {
        this.setState({
            listId: [...this.state.listId, newTodo.id],
            tasksLocal: [...this.state.tasksLocal, newTodo]
        });
        this.props.updateTodoItemInDashboard(this.state.position, newTodo.id, 'add_todo');
    }

    handleDeleteItem = (id) => {
        this.dispatch(deleteTodo(id, this.state.tasksLocal, this.state.position));
        this.props.updateTodoItemInDashboard(this.state.position, id, 'delete_todo');
    }

    deleteItemInDashBoard = (idDeleted) => {
        this.props.updateTodoItemInDashboard(this.state.position, idDeleted, 'delete_todo');
    }

    updateNumberActive = (isCompleted) => {
        let numberLefts = this.state.numberActive;

        if (isCompleted) {
            numberLefts++;
        } else {
            numberLefts--;
        }
        this.setState({
            numberActive: numberLefts
        });
    }

    onEnter = (ref) => {
        const task = ref.value;
        let taskObj = {
            task,
            userId: 1,
            isCompleted: false
        };

        ref.value = '';
        this.dispatch(addTodo(taskObj, this.updateListId));
    }

    // getNumberActive = (tasks) => {
    //     let count = 0;
    //     let result = '';

    //     count = (tasks.filter((task) => !task.isCompleted)).length;

    //     result = `${count} Item(s) left`;

    //     return result;
    // }

    getCompletedItem = () => {
        const tasks = this.state.tasksLocal;
        let result = [];

        tasks.forEach((task) => {
            if (task.isCompleted) {
                result.push(task.id);
            }
        });

        return result;
    }

    getTaskLocal = (allTasks) => {
        const listId = this.state.listId;
        let tasks = [];

        allTasks.forEach((task) => {
            const index = listId.findIndex((e) => e === parseInt(task.id, 10));

            if (index > empty) {
                tasks = [...tasks, task];
            }
        });

        this.setState({
            numberActive: tasks.filter((task) => !task.isCompleted).length
        });

        return tasks;
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.tasksLocal) {
            this.setState({
                tasksLocal: this.getTaskLocal(nextProps.todoList)
            });
        } else if (nextProps.todoList.widget && nextProps.todoList.widget === this.state.position) {
            this.setState({
                tasksLocal: nextProps.todoList.data
            });
        }
    }

    render() {
        while (!this.state.tasksLocal) {
            return (null);
        }

        return <TodoListWidgetView
            widget={this.widget}
            handleDeleteItem={this.handleDeleteItem}
            updateNumberActive={this.updateNumberActive}
            inputAddTodo={this.inputAddTodo}
            onEnter={this.onEnter}
            showAllBtn={this.showAllBtn}
            showActiveBtn={this.showActiveBtn}
            showCompletedBtn={this.showCompletedBtn}
            clearCompletedBtn={this.clearCompletedBtn}
            numberActive={this.state.numberActive}
            tasks={this.state.tasksLocal}
            colStyle={this.props.colStyle}
            minHeight={this.props.userHeight}
            position={`widget_${this.state.position}`}
            panelEvent={this.state.panelEvent}
        />;
    }
}

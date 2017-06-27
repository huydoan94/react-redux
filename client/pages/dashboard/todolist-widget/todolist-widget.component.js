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
        this.init();
    }

    init = () => {
        this.state = {
            title: this.props.widgetTitle,
            widgetMode: this.props.widgetMode,
            listId: this.props.widgetContent,
            position: parseInt((this.props.id).substring('widgetPos_'.length), 10),
            isMaximized: false,
            panelEvent: (event) => {
                this.triggerPanelEvent(event.target.value);
            },
            styles: {
                colStyle: this.props.colStyle,
                minHeight: this.props.userHeight
            }
        };

        this.triggerPanelEvent = (eventType) => {
            let thisWidgetPosition = parseInt((this.props.id).substring('widgetPos_'.length), 10);

            switch (eventType) {
            case 'fullscreen':
                this.setState({
                    isMaximized: !this.state.isMaximized,
                    styles: {
                        colStyle: !this.state.isMaximized ?
                        {
                            position: 'fixed',
                            left: '0',
                            top: '50px',
                            right: '0',
                            bottom: '-20px',
                            zIndex: '1000'
                        } : this.props.colStyle,
                        minHeight: this.props.userHeight
                    }
                });
                break;
            case 'setting':
                break;
            case 'remove':
                this.props.deleteWidget(thisWidgetPosition);
                break;
            default:
                break;
            }
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
                    this.props.dispatch(getAllTodo(this.state.listId, this.state.position));
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

                    this.props.dispatch(deleteCompletedTodo(arrayId, this.state.tasksLocal, this.state.position));
                    this.props.updateTodoItemInDashboard(this.state.position, arrayId, 'delete_multi_todo');
                }
            }
        };

        this.props.dispatch(getAllTodo());
    }

    filterItem = (type, condition) => {
        this.props.dispatch(filterTodo(type, condition, this.state.listId, this.state.position));
    };

    updateListId = (newTodo) => {
        this.setState({
            listId: [...this.state.listId, newTodo.id],
            tasksLocal: [...this.state.tasksLocal, newTodo]
        });
        this.props.updateTodoItemInDashboard(this.state.position, newTodo.id, 'add_todo');
    }

    handleDeleteItem = (id) => {
        this.props.dispatch(deleteTodo(id, this.state.tasksLocal, this.state.position));
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
        this.props.dispatch(addTodo(taskObj, this.updateListId));
        this.updateNumberActive(true);
    }

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

        this.setState({
            styles: {
                colStyle: nextProps.colStyle,
                minHeight: nextProps.userHeight
            },
            title: nextProps.widgetTitle,
            widgetMode: nextProps.widgetMode
        });
    }

    render() {
        while (!this.state.tasksLocal) {
            return (null);
        }

        return <TodoListWidgetView
            widget={{ title: this.state.title, widgetMode: this.state.widgetMode }}
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
            colStyle={this.state.styles.colStyle}
            minHeight={this.state.styles.minHeight}
            position={`widget_${this.state.position}`}
            panelEvent={this.state.panelEvent}
        />;
    }
}

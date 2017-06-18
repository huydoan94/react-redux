import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateTodo, deleteTodo } from '../../pages/todolist-widget/todo-list.action';
import { ItemView } from './item.view';

class Item extends Component {
    constructor(props) {
        super(props);

        this.item = this.props.itemObj;
        this.state = {
            isCompleted: this.item.isCompleted
        };

        this.buttonDeleteItem = {
            buttonContent: <span className='glyphicon glyphicon-remove'></span>,
            onButtonClick: this.handleDeleteButtonClick
        };

        const { dispatch } = this.props;

        this.dispatch = dispatch;
    }

    handleDeleteButtonClick = () => {
        const idItem = this.item.id;

        if (idItem) {
            this.dispatch(deleteTodo(idItem));
        }
    }

    updateItem = () => {
        this.item.isCompleted = !this.item.isCompleted;
        this.setState({
            isCompleted: this.item.isCompleted
        });
        const condition = {
            isCompleted: this.item.isCompleted
        };

        this.dispatch(updateTodo(this.item.id, condition));
    }

    render() {
        return (
            <ItemView item={this.item}
                buttonDeleteItem={this.buttonDeleteItem}
                updateItem={this.updateItem}
            />
        );
    }

}

const mapStateToProp = (state) => {
    return {
        todoList: state.todos
    };
};

export default connect(mapStateToProp)(Item);

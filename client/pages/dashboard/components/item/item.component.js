import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateTodo, deleteTodo } from '../../todolist-widget/todolist-widget.action';
import { ItemView } from './item.view';

class Item extends Component {
    constructor(props) {
        super(props);

        this.item = this.props.itemObj;
        this.state = {
            isCompleted: this.item.isCompleted
        };

        this.buttonDeleteItem = {
            attribute: {
                buttonContent: <span className='glyphicon glyphicon-remove'></span>,
                buttonStyle: 'delete-item-btn'
            },
            event: {
                onButtonClick: this.handleDeleteButtonClick
            }
        };

        const { dispatch } = this.props;

        this.dispatch = dispatch;
    }

    handleDeleteButtonClick = () => {
        this.props.handleDeleteItem(this.item.id);
        this.props.updateNumberActive(false);
    }

    updateItem = () => {
        this.item.isCompleted = !this.item.isCompleted;
        this.setState({
            isCompleted: this.item.isCompleted
        });
        const condition = {
            isCompleted: this.item.isCompleted
        };

        this.props.updateNumberActive(this.state.isCompleted);
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

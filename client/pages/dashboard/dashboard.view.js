import React from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import cssModules from 'react-css-modules';
// import {Todos} from './components';
import style from './dashboard.style.scss';

import { TextWidget } from '../text-widget';
import TodoListWidget from '../todolist-widget/todo-list-widget.component';

export const DashboardView = cssModules(({dashboard}) => {
    return (
        <div styleName='dashboard'>
            <div styleName='dashboard__title'>
                <h4>{dashboard.title}</h4>
                <div styleName='dashboard__layout-selector'>
                    <ButtonGroup>
                        <Button>Left</Button>
                        <Button>Middle</Button>
                        <Button>Right</Button>
                    </ButtonGroup>
                </div>
            </div>
            <div styleName='dashboard__body'>
                Dashboard
                <TextWidget />
                <TodoListWidget />
            </div>
        </div>
    );
}, style, {errorWhenNotFound: false});

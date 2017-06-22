import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import cssModules from 'react-css-modules';
// import {Todos} from './components';
import style from './dashboard.style.scss';

import { TextWidget } from './text-widget';
import TodoListWidget from './todolist-widget/todo-list-widget.component';
import { WidgetSetting } from './widget-setting';
import { DatabaseWidget } from './database-widget';

export const DashboardView = cssModules(({ title, layoutType, widgets }) => {
    const isFirstInRow = (index) => {
        if (index % 3 === 0) {
            return true;
        }

        return false;
    };

    return (
        <div>
            <div styleName='dashboard__title'>
                <h4 styleName='dashboard__title__header'>{title}</h4>
                <div styleName='dashboard__title__buttons'>
                    <ButtonGroup>
                        <Button>Left</Button>
                        <Button>Middle</Button>
                        <Button>Right</Button>
                    </ButtonGroup>
                </div>
            </div>
            {widgets.map((widget, index) => {
                if (isFirstInRow(index)) 
                    return <div className='col-md-12' styleName='dashboard__components'>widget
                return widget;
            })}
            <div className='col-md-12' styleName='dashboard__components'>
                <TextWidget />
                <DatabaseWidget />
                <TodoListWidget />
            </div>
            <div className='col-md-12' styleName='dashboard__components'>
                <WidgetSetting />
            </div>
            <div className='col-md-12' styleName='dashboard__components'>
                <TextWidget />
                <TextWidget />
            </div>
        </div>
    );
}, style);

import React from 'react';
import cssModules from 'react-css-modules';
import style from './todo-list-widget.style.scss';

import { Input } from '../../../components/input';
import { Button } from '../../../components/button';

import { WidgetContainer } from '../components/widgetContainer';
import { WidgetHeader } from '../components/widgetHeader';
import { WidgetBody } from '../components/widgetBody';
import { ItemList } from '../components/itemList';

export const TodoListWidgetView = cssModules((props) => {
    const { widget,
        inputAddTodo,
        onEnter,
        showAllBtn,
        showActiveBtn,
        showCompletedBtn,
        clearCompletedBtn,
        numberCompleted,
        tasks
        } = props;

    inputAddTodo.inputClass = 'add-new-item-input';

    return (
        <WidgetContainer>
            <WidgetHeader widget={widget} />
            <WidgetBody>
                <Input inputAtrribute={inputAddTodo}
                    onEnter={onEnter}
                />
                <div styleName="widget-container__todo-list-option">
                    <span styleName="padding-right-20">{numberCompleted}</span>
                    <Button classButton="simple-button" buttonDetail={showAllBtn}></Button>
                    <Button classButton="simple-center-button" buttonDetail={showActiveBtn}></Button>
                    <Button classButton="simple-button" buttonDetail={showCompletedBtn}></Button>
                    <div styleName="right-postion">
                        <Button classButton="no-border-button" buttonDetail={clearCompletedBtn}></Button>
                    </div>
                </div>
                <ItemList items={tasks} />
            </WidgetBody>
        </WidgetContainer>
    );
}, style);
import React from 'react';
import cssModules from 'react-css-modules';
import style from './todolist-widget.style.scss';

import { Input } from '../../../components/input';
import { Button } from '../../../components/button';

import { WidgetContainer } from '../components/widgetContainer';
import { WidgetHeader } from '../components/widgetHeader';
import { WidgetBody } from '../components/widgetBody';
import { ItemList } from '../components/itemList';

export const TodoListWidgetView = cssModules((props) => {
    const {
        widget,
        handleDeleteItem,
        updateNumberActive,
        inputAddTodo,
        onEnter,
        showAllBtn,
        showActiveBtn,
        showCompletedBtn,
        clearCompletedBtn,
        numberActive,
        tasks,
        colStyle,
        maxHeight
        } = props;

    inputAddTodo.inputClass = 'add-new-item-input';

    return (
        <WidgetContainer colStyle={colStyle} maxHeight={maxHeight}>
            <WidgetHeader widget={widget} />
            <WidgetBody>
                <Input inputAtrribute={inputAddTodo}
                    onEnter={onEnter}
                />
                <div styleName="widget-container__todo-list-option">
                    <span styleName="padding-right-20">{`${numberActive} Item(s) left`}</span>
                    <Button buttonAttribute={showAllBtn.attribute} buttonEvent={showAllBtn.event}></Button>
                    <Button buttonAttribute={showActiveBtn.attribute} buttonEvent={showActiveBtn.event}></Button>
                    <Button buttonAttribute={showCompletedBtn.attribute} buttonEvent={showCompletedBtn.event}></Button>
                    <div styleName="right-postion">
                        <Button buttonAttribute={clearCompletedBtn.attribute} buttonEvent={clearCompletedBtn.event}></Button>
                    </div>
                </div>
                <div style={{ overflow: 'auto' }}>
                    <ItemList
                        items={tasks}
                        handleDeleteItem={handleDeleteItem}
                        updateNumberActive={updateNumberActive}
                    />
                </div>
            </WidgetBody>
        </WidgetContainer>
    );
}, style);
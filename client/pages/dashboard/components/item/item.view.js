import React from 'react';
import cssModules from 'react-css-modules';
import style from './item.style.scss';

import { Button } from '../../../../components/button';

export const ItemView = cssModules(({ item, buttonDeleteItem, updateItem }) => {
    return (
        <li styleName='item-wrapper'>
            <input type="checkbox"
                id={item.id}
                checked={item.isCompleted}
                onChange={updateItem}
                styleName='styled-checkbox'
            />
            <label
                htmlFor={item.id}
                styleName={item.isCompleted ? 'item-completed' : null}
                style={{ paddingLeft: '15px' }}>
            {item.task}
            </label>
            <Button buttonAttribute={buttonDeleteItem.attribute} buttonEvent={buttonDeleteItem.event} />
        </li>
    );
}, style);


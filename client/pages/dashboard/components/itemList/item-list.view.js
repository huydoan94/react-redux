import React from 'react';
import cssModules from 'react-css-modules';
import style from './item-list.style.scss';

import Item from '../item/item.component';

export const ItemListView = cssModules(({ items, handleDeleteItem, updateNumberActive}) => {
    return (
        <ul styleName='list__container'>
            {items.map((item) =>
                <Item
                     key={item.id}
                     itemObj={item}
                     handleDeleteItem={handleDeleteItem}
                     updateNumberActive={updateNumberActive}
                 />)
            }
        </ul>
    );
}, style);


import React from 'react';
import cssModules from 'react-css-modules';
import style from './item-list.style.scss';

import Item from '../item/item.component';

export const ItemListView = cssModules(({ items }) => {
    return (
        <ul style={{'listStyleType': 'none', 'padding': 0, 'margin': '7px 0 0 0'}}>
            {items.map((item) =>
                <Item key={item.id} itemObj={item} />)
            }
        </ul>
    );
}, style);


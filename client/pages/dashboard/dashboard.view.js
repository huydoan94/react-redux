import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import cssModules from 'react-css-modules';
import style from './dashboard.style.scss';

export const DashboardView = cssModules(({ title, layoutType, widgets, changeLayout }) => {
    const combineWidgetToBlock = (allWidgets, columnLayout) => {
        let blocks = [],
            finalBlocks = [];

        const indexOffset = 1,
            isFilled = 0;
        const template = (blockWidgets, index) => {
            return (
                <div key={`widgetBlockPos_${index}`}
                    styleName='dashboard__components'
                    className='col-md-12'>
                    {blockWidgets.map((blockWidget) => blockWidget)}
                </div>
            );
        };

        allWidgets.forEach((widget, index) => {
            blocks.push(widget);

            if ((index + indexOffset) % columnLayout === isFilled ||
                (index + indexOffset) === allWidgets.length) {
                finalBlocks.push(template(blocks, (index + indexOffset) / columnLayout));
                blocks.length = 0;
            }
        });

        return finalBlocks;
    };

    const singleCol = 1,
        doubleCol = 2,
        tripleCol = 3;

    return (
        <div>
            <div styleName='dashboard__title'>
                <h4 styleName='dashboard__title__header'>{title}</h4>
                <div styleName='dashboard__title__buttons'>
                    <ButtonGroup>
                        <Button
                            value='1'
                            onClick={changeLayout}
                            bsStyle={layoutType === singleCol ? 'primary' : 'default'}>
                            Single Collumn
                        </Button>
                        <Button
                            value='2'
                            onClick={changeLayout}
                            bsStyle={layoutType === doubleCol ? 'primary' : 'default'}>
                            Double Collumns
                        </Button>
                        <Button
                            value='3'
                            onClick={changeLayout}
                            bsStyle={layoutType === tripleCol ? 'primary' : 'default'}>
                            Triple Collumns
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
            {combineWidgetToBlock(widgets, layoutType).map((block) => block)}
        </div>
    );
}, style);

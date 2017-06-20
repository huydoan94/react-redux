import React from 'react';
import cssModules from 'react-css-modules';
import Reactable from 'reactable';

import style from './database-widget.style.scss';

import { WidgetContainer } from '../components/widgetContainer';
import { WidgetHeader } from '../components/widgetHeader';
import { WidgetBody } from '../components/widgetBody';

export const DatabaseWidgetView = cssModules(({ WidgetType, DatabaseTable }) => {
    const { headers, values } = DatabaseTable;

    return (
        <WidgetContainer>
            <WidgetHeader widget={WidgetType} className='row col-md-12' />
            <WidgetBody className='row col-md-12'>
                <Reactable.Table className="table table-striped"
                       id="table"
                       data={values}
                       itemsPerPage={5}
                       pageButtonLimit={3}
                       sortable={headers}
                />
            </WidgetBody>
        </WidgetContainer>
    );
}, style);

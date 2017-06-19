import React from 'react';
import cssModules from 'react-css-modules';

import style from './database-widget.style.scss';
import { Table } from 'react-bootstrap';

import { WidgetContainer } from '../components/widgetContainer';
import { WidgetHeader } from '../components/widgetHeader';
import { WidgetBody } from '../components/widgetBody';
import { getAll } from './database-services';

export const DatabaseWidgetView = cssModules(({ WidgetType, EditWidgetValues }) => {
    let headers = [];

    getAll().then((datas) => {
        console.log(datas);
        headers = Object.keys(datas)[0];
    });

    return (
        <WidgetContainer>
            <WidgetHeader widget={WidgetType} className='row col-md-12' />
            <WidgetBody className='row col-md-12'>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            {headers.forEach((header) =>
                                <tr>{header}</tr>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>123</td>
                            <td>321</td>
                            <td>123</td>
                        </tr>
                        <tr>
                            <td>123</td>
                            <td>321</td>
                            <td>123</td>
                        </tr>
                        <tr>
                            <td>123</td>
                            <td>321</td>
                            <td>123</td>
                        </tr>
                    </tbody>
                </Table>
            </WidgetBody>
        </WidgetContainer>
    );
}, style);

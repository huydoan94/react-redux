import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { WidgetContainer } from '../components/widgetContainer';
import { WidgetHeader } from '../components/widgetHeader';
import { WidgetBody } from '../components/widgetBody';

export const DatabaseWidgetView = ({ WidgetType, DatabaseTable }) => {
    const { headers, values } = DatabaseTable;

    const getCaret = (direction) => {
        switch (direction) {
        case 'asc':
            return (
                <span className='glyphicon glyphicon-sort-by-attributes'></span>
            );
        case 'desc':
            return (
                <span className='glyphicon glyphicon-sort-by-attributes-alt'></span>
            );
        default:
            return;
        }
    };

    const tableOptions = {
        sizePerPage: 5,
        paginationSize: 3,
        prePage: '<<',
        nextPage: '>>',
        withFirstAndLast: false,
        hideSizePerPage: true,
        alwaysShowAllBtns: true,
        paginationPosition: 'top',
        onPageChange: (page, sizePerPage) => {
            console.log(page + ' + ' + sizePerPage);
        }
    };

    return (
        <WidgetContainer>
            <WidgetHeader widget={WidgetType} className='row col-md-12' />
            <WidgetBody className='row col-md-12'>
                <div style={{ overflow: 'auto' }}>
                    <BootstrapTable
                        data={values}
                        bordered={false}
                        striped
                        hover
                        condensed
                        pagination
                        options={tableOptions}>
                        {headers.map((header) => {
                            return (
                                <TableHeaderColumn
                                    dataField={header}
                                    dataSort={true}
                                    caretRender={getCaret}
                                    isKey={header === 'id'}
                                    width='100%'>
                                    {header}
                                </TableHeaderColumn>
                            );
                        })}
                    </BootstrapTable>
                </div>
            </WidgetBody>
        </WidgetContainer>
    );
};

import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { WidgetContainer } from '../components/widgetContainer';
import { WidgetHeader } from '../components/widgetHeader';
import { WidgetBody } from '../components/widgetBody';

export const DatabaseWidgetView = (props) => {
    const { WidgetConfigs } = props,
        { DatabaseTable } = props.WidgetConfigs,
        { colStyle, minHeight } = props.WidgetStyles;

    const getCaret = (direction) => {
        switch (direction) {
        case 'asc':
            return <span className='glyphicon glyphicon-sort-by-attributes'></span>;
        case 'desc':
            return <span className='glyphicon glyphicon-sort-by-attributes-alt'></span>;
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
            console.log(`${page  } + ${  sizePerPage}`);
            // TODO: Missing showing current contact block
        }
    };

    return (
        <WidgetContainer colStyle={colStyle} minHeight={minHeight}>
            <WidgetHeader widget={{
                title: WidgetConfigs.title,
                widgetMode: WidgetConfigs.widgetMode,
                buttonEventCatcher: WidgetConfigs.panelEvent
            }} />
            <WidgetBody>
                <div style={{ overflow: 'auto' }}>
                    <BootstrapTable
                        data={DatabaseTable.values}
                        bordered={false}
                        striped
                        hover
                        condensed
                        pagination
                        options={tableOptions}>
                        {DatabaseTable.headers.map((header) => {
                            return (
                                <TableHeaderColumn
                                    dataField={header}
                                    dataSort={true}
                                    caretRender={getCaret}
                                    isKey={header === 'id'}
                                    key={header}
                                >
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

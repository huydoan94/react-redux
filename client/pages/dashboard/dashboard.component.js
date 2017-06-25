import React from 'react';
import { DashboardView } from './dashboard.view';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';


import { fetchDashboard, changeLayout } from './dashboard.action';

import { TextWidget } from './text-widget';
import { TodoListWidget } from './todolist-widget';
import { DatabaseWidget } from './database-widget';
import { WidgetSetting } from './widget-setting';

@connect(state => ({ dashboard: state.dashboard }))
export class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        if (!sessionStorage.getItem('jwtToken')) {
            browserHistory.push('/login');
        }

        props.dispatch(fetchDashboard(jwtDecode(sessionStorage.getItem('jwtToken')).id));
    }

    fillWithEmptyWidget = (widgets) => {
        let widgetArray = [];
        const positionOffset = -1,
            incrementNumber = 1,
            singleCol = 1,
            doubleCol = 2,
            tripleCol = 3;

        const getColStyle = () => {
            switch (this.props.dashboard.layoutColumn) {
            case singleCol:
                return 'col-md-12';
            case doubleCol:
                return 'col-md-6';
            case tripleCol:
                return 'col-md-4';
            default:
                return 'col-md-12';
            }
        };

        const fillDashboard = (currentWidgets, columnLayout) => {
            for (let index = 0; index < currentWidgets.length; index += incrementNumber) {
                if (typeof currentWidgets[index] === 'undefined') {
                    currentWidgets[index] = <WidgetSetting key={`widgetPos_${index + incrementNumber}`}
                        id={`widgetPos_${index + incrementNumber}`}
                        colStyle={getColStyle()} />;
                }
            }

            let missingWidget = columnLayout - (currentWidgets.length % columnLayout);

            for (let index = 0; index < missingWidget; index += incrementNumber) {
                currentWidgets.push(<WidgetSetting key={`widgetPos_${currentWidgets.length + incrementNumber}`}
                    id={`widgetPos_${currentWidgets.length + incrementNumber}`}
                    colStyle={getColStyle()} />);
            }

            return currentWidgets;
        };

        widgets.forEach((widget) => {
            const { maxWidth, maxHeight } = widget;

            switch (widget.widgetType) {
            case 'TEXT_WIDGET':
                widgetArray[widget.position + positionOffset] =
                        <TextWidget key={`widgetPos_${widget.position}`}
                            id={`widgetPos_${widget.position}`}
                            colStyle={getColStyle()}
                            userHeight={maxHeight} />;
                break;
            case 'DATABASE_WIDGET':
                widgetArray[widget.position + positionOffset] =
                        <DatabaseWidget key={`widgetPos_${widget.position}`}
                            id={`widgetPos_${widget.position}`}
                            colStyle={getColStyle()}
                            userHeight={maxHeight} />;
                break;
            case 'TODOLIST_WIDGET':
                widgetArray[widget.position + positionOffset] =
                        <TodoListWidget key={`widgetPos_${widget.position}`}
                            id={`widgetPos_${widget.position}`}
                            colStyle={getColStyle()}
                            userHeight={maxHeight} />;
                break;
            default:
                break;
            }
        });

        return fillDashboard(widgetArray, this.props.dashboard.layoutColumn);
    }

    changeLayout = (event) => {
        this.props.dispatch(changeLayout(parseInt(event.target.value, 10), this.props.dashboard.id));
    }

    render() {
        const { layoutColumn, title, widgets } = this.props.dashboard;

        return <DashboardView title={title}
            layoutType={layoutColumn}
            widgets={this.fillWithEmptyWidget(widgets)}
            changeLayout={this.changeLayout} />;
    }
}

import React from 'react';
import { DashboardView } from './dashboard.view';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { fetchDashboard } from './dashboard.action';

import { TextWidget } from './text-widget';
import TodoListWidget from './todolist-widget/todo-list-widget.component';
import { DatabaseWidget } from './database-widget';

@connect(state => ({ dashboard: state.dashboard }))
export class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        if (sessionStorage.getItem('jwtToken') === null) {
            browserHistory.push('/login');
        }

        props.dispatch(fetchDashboard(1)); // change to User ID later
    }

    fillWithEmptyWidget = (widgets) => {
        let widgetArray = [];
        let currentPosition = 0;
        const maxGap = 1,
            incrementNumber = 1;

        widgets.forEach((widget) => {
            while (widget.position - currentPosition > maxGap) {
                widgetArray.push(<TextWidget/>);
                currentPosition += incrementNumber;
            }

            switch (widget.widgetType) {
            case 'TEXT_WIDGET':
                widgetArray.push(<TextWidget/>);
                break;
            case 'DATABASE_WIDGET':
                widgetArray.push(<DatabaseWidget/>);
                break;
            case 'TODOLIST_WIDGET':
                widgetArray.push(<TodoListWidget/>);
                break;
            default:
                break;
            }
            currentPosition += incrementNumber;
        });

        return widgetArray;
    }

    render() {
        const {layoutType, title, widgets} = this.props.dashboard;

        return <DashboardView title={title}
                              layoutType={layoutType}
                              widgets={this.fillWithEmptyWidget(widgets)}/>;
    }
}

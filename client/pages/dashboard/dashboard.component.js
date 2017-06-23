import React from 'react';
import { DashboardView } from './dashboard.view';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { fetchDashboard, changeLayout } from './dashboard.action';

import { TextWidget } from './text-widget';
import { TodoListWidget } from './todolist-widget';
import { DatabaseWidget } from './database-widget';
import { WidgetSetting } from './widget-setting';

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
        const positionOffset = -1,
            incrementNumber = 1,
            singleCol = 1,
            doubleCol = 2,
            tripleCol = 3,
            getColStyle = () => {
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
            },
            fillDashboard = (currentWidgets, columnLayout) => {
                for (let index = 0; index < currentWidgets.length; index += incrementNumber) {
                    if (typeof widgetArray[index] === 'undefined') {
                        widgetArray[index] = <WidgetSetting colStyle={getColStyle()}/>;
                    }
                }

                // E.g: current widgets = 5, layout = 3
                // missing = 3 - ( 5 % 3 ) = 3 - 2 = 1 => fill in 1 widget
                // => total widgets = 5 + 1 = 6

                // E.g 2: current widgets = 6, layout = 3
                // missing = 3 - ( 6 % 3 ) = 3 - 0 = 3 => fill in 3 widget
                // => total widgets = 6 + 3 = 9

                // E.g 3: current widgets = 5, layout = 2
                // missing = 2 - ( 5 % 2 ) = 2 - 1 = 1 => fill in 1 widget
                // => total widgets = 5 + 1 = 6 ratio 2 / 2 / 2
                let missingWidget = columnLayout - (currentWidgets.length % columnLayout);

                for (let index = 0; index < missingWidget; index += incrementNumber) {
                    widgetArray.push(<WidgetSetting colStyle={getColStyle()}/>);
                }

                return widgetArray;
            };

        widgets.forEach((widget) => {
            switch (widget.widgetType) {
            case 'TEXT_WIDGET':
                widgetArray[widget.position + positionOffset] = <TextWidget colStyle={getColStyle()} />;
                break;
            case 'DATABASE_WIDGET':
                widgetArray[widget.position + positionOffset] = <DatabaseWidget colStyle={getColStyle()} />;
                break;
            case 'TODOLIST_WIDGET':
                widgetArray[widget.position + positionOffset] = <TodoListWidget colStyle={getColStyle()} />;
                break;
            default:
                break;
            }
        });

        return fillDashboard(widgetArray, this.props.dashboard.layoutColumn);
    }

    changeLayout = (event) => {
        this.props.dispatch(changeLayout(parseInt(event.target.value, 10), 20));
    }

    render() {
        const { layoutColumn, title, widgets } = this.props.dashboard;

        return <DashboardView title={title}
            layoutType={layoutColumn}
            widgets={this.fillWithEmptyWidget(widgets)}
            changeLayout={this.changeLayout} />;
    }
}

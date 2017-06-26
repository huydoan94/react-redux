import React from 'react';
import { DashboardView } from './dashboard.view';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import { remove } from 'lodash';


import { fetchDashboard, changeLayout, removeWidget } from './dashboard.action';
import { updateDashBoard } from './dashboard.service';

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

    fillDashboard = (widgets) => {
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

        const fillWithEmptyWidget = (currentWidgets, columnLayout) => {
            for (let index = 0; index < currentWidgets.length; index += incrementNumber) {
                if (typeof currentWidgets[index] === 'undefined') {
                    currentWidgets[index] =
                    <WidgetSetting
                        key={`widgetPos_${index + incrementNumber}`}
                        id={`widgetPos_${index + incrementNumber}`}
                        addWidget={this.addWidget}
                        colStyle={getColStyle()}
                    />;
                }
            }

            let missingWidget = columnLayout - (currentWidgets.length % columnLayout);

            for (let index = 0; index < missingWidget; index += incrementNumber) {
                currentWidgets.push(
                    <WidgetSetting
                        key={`widgetPos_${currentWidgets.length + incrementNumber}`}
                        id={`widgetPos_${currentWidgets.length + incrementNumber}`}
                        addWidget={this.addWidget}
                        colStyle={getColStyle()}
                    />
                );
            }

            return currentWidgets;
        };

        widgets.forEach((widget) => {
            const minHeight = widget.maxHeight; // Because of database mismatch !!!

            switch (widget.widgetType) {
            case 'TEXT_WIDGET':
                widgetArray[widget.position + positionOffset] =
                        <TextWidget key={`widgetPos_${widget.position}`}
                            id={`widgetPos_${widget.position}`}
                            colStyle={getColStyle()}
                            userHeight={minHeight}
                            deleteWidget={this.deleteWidget}
                        />;
                break;

            case 'DATABASE_WIDGET':
                widgetArray[widget.position + positionOffset] =
                        <DatabaseWidget key={`widgetPos_${widget.position}`}
                            id={`widgetPos_${widget.position}`}
                            colStyle={getColStyle()}
                            userHeight={minHeight}
                            deleteWidget={this.deleteWidget}
                        />;
                break;

            case 'TODOLIST_WIDGET':
                widgetArray[widget.position + positionOffset] =
                        <TodoListWidget key={`widgetPos_${widget.position}`}
                            id={`widgetPos_${widget.position}`}
                            position={widget.position}
                            colStyle={getColStyle()}
                            userHeight={minHeight}
                            deleteWidget={this.deleteWidget}
                            widgetContent={widget.configs.todos}
                            updateTodoItemInDashboard={this.updateTodoItemInDashboard}
                        />;
                break;

            default:
                break;
            }
        });

        return fillWithEmptyWidget(widgetArray, this.props.dashboard.layoutColumn);
    }

    changeLayout = (event) => {
        this.props.dispatch(changeLayout(parseInt(event.target.value, 10), this.props.dashboard.id));
    }

    deleteWidget = (widgetPosition) => {
        let allWidgets = this.props.dashboard.widgets;
        let results = allWidgets.filter((widget) => {
            return widget.position !== widgetPosition;
        });

        this.props.dispatch(removeWidget(results, this.props.dashboard.id));
    }

    addWidget = (widgetPosition, settingData) => {
        console.log(widgetPosition);
        console.log(settingData);
        // let allWidgets = this.props.dashboard.widgets;
        // let results = allWidgets.filter((widget) => {
        //     return widget.position !== widgetPosition;
        // });

        // this.props.dispatch(removeWidget(results, this.props.dashboard.id));
    }

    updateTodoItemInDashboard = (position, idTodo, action) => {
        const
            empty = -1,
            dashboard = this.props.dashboard,
            dashboardId = dashboard.id;
        let widgets = dashboard.widgets;

        const index = widgets.findIndex((e) => e.position === position);

        if (index > empty) {
            let
                widget = widgets[index],
                todos = widget.configs.todos;

            if (action === 'add_todo') {
                todos = [...todos, idTodo];
            } else if (action === 'delete_todo') {
                remove(todos, (e) => e === idTodo);
            } else {
                idTodo.forEach((id) => remove(todos, (e) => parseInt(e, 10) === parseInt(id, 10)));
            }
            widget.configs.todos = todos;
            updateDashBoard(dashboardId, [widget]);
        }
    }

    render() {
        const { layoutColumn, title, widgets } = this.props.dashboard;

        return <DashboardView title={title}
            layoutType={layoutColumn}
            widgets={this.fillDashboard(widgets)}
            changeLayout={this.changeLayout} />;
    }
}

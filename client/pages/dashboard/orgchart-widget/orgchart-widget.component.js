import React from 'react';
import { OrgchartWidgetView } from './orgchart-widget.view';
import { getAll } from './orgchart-widget.services';

import { WidgetSetting } from '../widget-setting/widget-setting.component';

export class OrgchartWidget extends React.Component {
    constructor(props) {
        super(props);

        this.init();
    }

    init = () => {
        this.state = {
            type: 'ORGCHART_WIDGET',
            title: this.props.widgetTitle,
            widgetMode: this.props.widgetMode,
            rootContact: null,
            panelEvent: (event) => {
                this.panelEventTrigger(event.target.value);
            },
            styles: {
                colStyle: this.props.colStyle,
                minHeight: this.props.userHeight
            },
            isSetting: false
        };

        this.getDataAndSetState(this.props.widgetContent);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            styles: {
                colStyle: nextProps.colStyle,
                minHeight: nextProps.userHeight
            },
            title: nextProps.widgetTitle,
            widgetMode: nextProps.widgetMode
        });

        this.getDataAndSetState(nextProps.widgetContent);
    }

    getDataAndSetState = (rootId) => {
        getAll().then((datas) => {
            const firstElement = 0;
            let rootContact = datas.filter((data) => data.id === rootId)[firstElement];

            rootContact.children = this.combineDataToTreeModel(rootId, datas);
            this.setState({ rootContact });
        });
    }

    combineDataToTreeModel = (rootId, datas) => {
        const emptyComparer = 0;
        let immediateContact = datas.filter((data) => data.superiorId === rootId),
            leftOver = datas.filter((data) => data.superiorId !== rootId && data.id !== rootId);

        if (leftOver.length === emptyComparer) {
            return [];
        }

        immediateContact.forEach((result) => {
            result.children = this.combineDataToTreeModel(result.id, leftOver);
        });

        return immediateContact;
    }

    panelEventTrigger(eventType) {
        const thisWidgetPosition = parseInt((this.props.id).substring('widgetPos_'.length), 10);

        switch (eventType) {
        case 'fullscreen':
            this.setState({
                isMaximized: !this.state.isMaximized,
                styles: {
                    colStyle: !this.state.isMaximized ?
                    {
                        position: 'fixed',
                        left: '0',
                        top: '50px',
                        right: '0',
                        bottom: '-20px',
                        zIndex: '1000'
                    } : this.props.colStyle,
                    minHeight: this.props.userHeight
                }
            });
            break;
        case 'setting':
            this.setState({ isSetting: true });
            break;
        case 'remove':
            this.props.deleteWidget(thisWidgetPosition);
            break;
        default:
            break;
        }
    }

    onUpdateCompleted = (widgetPosition, settingData, isUpdate) => {
        isUpdate ? this.setState({ isSetting: false }) : null;
        this.props.addOrUpdateWidget(widgetPosition, settingData, isUpdate);
    }

    render() {
        return this.state.isSetting ?
            <WidgetSetting
                key={this.props.id}
                id={this.props.id}
                colStyle={this.state.styles.colStyle}
                widgetMode={this.state.widgetMode}
                addOrUpdateWidget={this.onUpdateCompleted}
                originWidget={{
                    type: this.state.type,
                    widgetContent: {
                        title: this.state.title,
                        minHeight: this.state.styles.minHeight,
                        root: this.state.rootContact ? this.state.rootContact.id : null
                    },
                    onCancel: () => {
                        this.setState({ isSetting: false });
                    }
                }}
            /> :
            <OrgchartWidgetView
                WidgetConfigs={this.state}
                WidgetStyles={{ colStyle: this.state.styles.colStyle, minHeight: this.state.styles.minHeight }}
            />;
    }
}
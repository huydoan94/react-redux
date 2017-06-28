import React from 'react';
import { OrgchartWidgetView } from './orgchart-widget.view';
import { getAll } from './orgchart-widget.services';

export class OrgchartWidget extends React.Component {
    constructor(props) {
        super(props);

        this.init();
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
    }

    init = () => {
        this.state = {
            title: this.props.widgetTitle,
            widgetMode: this.props.widgetMode,
            rootContactId: this.props.widgetContent,
            rootContact: null,
            panelEvent: (event) => {
                this.panelEventTrigger(event.target.value);
            },
            styles: {
                colStyle: this.props.colStyle,
                minHeight: this.props.userHeight
            }
        };

        getAll().then((datas) => {
            const rootId = this.props.widgetContent,
                firstElement = 0;
            let rootContact = datas.filter((data) => data.id === rootId)[firstElement];

            rootContact.children = this.combineDataToTreeModel(rootId, datas);
            this.setState({ rootContact });
        });
    }

    combineDataToTreeModel = (rootId, datas) => {
        const emptyComparer = 0;
        let rootContact = datas.filter((data) => data.superiorId === rootId),
            leftOver = datas.filter((data) => data.superiorId !== rootId && data.id !== rootId);

        if (leftOver.length === emptyComparer) {
            return [];
        }

        rootContact.forEach((result) => {
            result.children = this.combineDataToTreeModel(result.id, leftOver);
        });

        return rootContact;
    }

    panelEventTrigger(eventType) {
        let thisWidgetPosition = parseInt((this.props.id).substring('widgetPos_'.length), 10);

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
            break;
        case 'remove':
            this.props.deleteWidget(thisWidgetPosition);
            break;
        default:
            break;
        }
    }

    render() {
        return <OrgchartWidgetView
            WidgetConfigs={this.state}
            WidgetStyles={{ colStyle: this.state.styles.colStyle, minHeight: this.state.styles.minHeight }}
        />;
    }
}
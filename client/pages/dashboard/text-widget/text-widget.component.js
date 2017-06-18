import React from 'react';
import { TextWidgetView } from './text-widget.view';

const widget = {
    title: 'Text Widget',
    configs: {
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    mode: 'editMode'
};

export class TextWidget extends React.Component {
    render() {
        return <TextWidgetView widget={widget}/>;
    }
}
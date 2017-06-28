import React, { Component } from 'react';
import MarkdownEditor from 'react-markdown-editor';

export class TextSettingView extends Component {
    constructor(props) {
        super(props);

        this.initialContent = this.props.initialContent;
    }

    componentDidMount() {
        this.props.onSettingConfigsChange(this.initialContent);
    }

    onEditorType = (texts) => {
        this.props.onSettingConfigsChange(texts);
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <label>Text Content:</label>
                </div>
                <MarkdownEditor.MarkdownEditor
                initialContent={this.initialContent}
                iconsSet="font-awesome"
                onContentChange={this.onEditorType}
                />
            </div>
        );
    }
}
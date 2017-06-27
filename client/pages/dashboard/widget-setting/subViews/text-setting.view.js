import React, { Component } from 'react';
import MarkdownEditor from 'react-markdown-editor';

export class TextSettingView extends Component {
    render() {
        return (
            <div>
                <div className="form-group">
                    <label>Text Content:</label>
                </div>
                <MarkdownEditor.MarkdownEditor
                initialContent="Test"
                iconsSet="font-awesome"
                style ={{styleTab: {
                    display: 'none'
                }}}
                />
            </div>
        );
    }
}
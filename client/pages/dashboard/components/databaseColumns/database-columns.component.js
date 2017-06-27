import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import style from './database-columns.style.scss';

export class DatabaseColumns extends Component {
    render = cssModules(() => {
        return (
            <div>
                <div>{this.props.databaseColumns.title}</div>
                <div styleName='columns-wrapper'>
                    {
                        this.props.databaseColumns.columns.map((column) => <div styleName='column'>{column}</div>)
                    }
                </div>
            </div>
        );
    }, style);
}
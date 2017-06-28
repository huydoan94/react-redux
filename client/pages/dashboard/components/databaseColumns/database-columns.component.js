import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import style from './database-columns.style.scss';

export class DatabaseColumns extends Component {
    render = cssModules(() => {
        return (
            <div styleName='columns-container'>
                <h4>{this.props.databaseColumns.title}</h4>
                <div styleName='columns-wrapper'>
                    {
                        this.props.databaseColumns.columns.map((column, index) =>
                            <div
                                id={`dbColumns${index}`}
                                key={`dbColumns${index}`}
                                styleName='column'
                                onClick={this.props.databaseColumns.onSelect}>
                                {column}
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }, style);
}
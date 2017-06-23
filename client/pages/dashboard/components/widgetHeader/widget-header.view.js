import React from 'react';
import cssModules from 'react-css-modules';
import style from './widget-header.style.scss';

export const WidgetHeaderView = cssModules(({ widget }) => {
    const {title, mode} = widget;

    return (
        <div styleName='widget-header-wrapper'>
            <div styleName='widget-header-wrapper__title'>
                {title}
            </div>
            <div styleName='widget-header-wrapper__option'>
                { mode === 'viewMode' ? (
                    <span className='glyphicon glyphicon-fullscreen'></span>
                ) : mode === 'settingMode' ? (
                    <span className='glyphicon glyphicon-remove'></span>
                ) : (
                        <div>
                            <span className='glyphicon glyphicon-cog' />
                            <span styleName='widget-header-wrapper__option__center'
                                  className='glyphicon glyphicon-fullscreen' />
                            <span className='glyphicon glyphicon-remove' />
                        </div>
                    )
                }
            </div>
        </div>
    );
}, style);

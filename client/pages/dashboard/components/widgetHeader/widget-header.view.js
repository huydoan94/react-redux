import React from 'react';
import cssModules from 'react-css-modules';
import style from './widget-header.style.scss';

export const WidgetHeaderView = cssModules(({ widget }) => {
    return (
        <div className='panel-heading col-md-12'>
            <div styleName='widget-header-wrapper__title'>
                {widget.title}
            </div>
            <div styleName='widget-header-wrapper__option'>
                { widget.mode === 'viewMode' ? (
                    <span className='glyphicon glyphicon-fullscreen'></span>
                ) : widget.mode === 'settingMode' ? (
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
}, style, { errorWhenNotFound: false });
import React from 'react';
import cssModules from 'react-css-modules';
import style from './widget-header.style.scss';

export const WidgetHeader = cssModules(({ widget }) => {
    const { title, widgetMode, buttonEventCatcher } = widget;

    return (
        <div styleName='widget-header-wrapper'>
            <div styleName='widget-header-wrapper__title'>
                {title}
            </div>
            <div styleName='widget-header-wrapper__option'>
                { widgetMode === 'viewMode' && (
                    <button className='glyphicon glyphicon-fullscreen' styleName='button-style'
                            value='fullscreen'
                            onClick={buttonEventCatcher} />
                )}
                { widgetMode === 'settingMode' && (
                    <div>
                        <button className='glyphicon glyphicon-cog' styleName='button-style'
                            value='setting'
                            onClick={buttonEventCatcher} />
                        <button className='glyphicon glyphicon-fullscreen' styleName='button-style'
                            value='fullscreen'
                            onClick={buttonEventCatcher} />
                        <button className='glyphicon glyphicon-remove' styleName='button-style'
                            value='remove'
                            onClick={buttonEventCatcher} />
                    </div>
                )}
            </div>
        </div>
    );
}, style);

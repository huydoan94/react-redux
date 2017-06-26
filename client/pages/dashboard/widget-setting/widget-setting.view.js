import React from 'react';
import cssModules from 'react-css-modules';
import { Button, ButtonGroup } from 'react-bootstrap';

import style from './widget-setting.style.scss';

import { WidgetContainer } from '../components/widgetContainer';
import { WidgetHeader } from '../components/widgetHeader';
import { WidgetBody } from '../components/widgetBody';
import { Input } from '../../../components/input';
import { Select } from '../../../components/select';

export const WidgetSettingView = cssModules((props) => {
    const {
        WidgetConfigs,
        WidgetStyles,
        EditWidgetValues,
        WidgetSelector,
        SaveButton,
        CancelButton,
        RevealSettings
    } = props;

    return (
        <WidgetContainer colStyle={WidgetStyles.colStyle}>
            <WidgetHeader widget={{ title: WidgetConfigs.title, mode: WidgetConfigs.mode }} />
            <WidgetBody>
                {WidgetConfigs.isRevealed ? (
                    <div styleName='setting'>
                        <div styleName='setting__header'>
                            <Input inputAtrribute={EditWidgetValues} />
                            <div styleName='setting__header__inputgroup'>
                                <div styleName='setting__header__inputgroup__left'>
                                    <Select WidgetSelector={WidgetSelector} />
                                </div>
                                <div styleName='setting__header__inputgroup__middle'>
                                    <Input inputAtrribute={{label: 'Min Width: '}} />
                                </div>
                                <div styleName='setting__header__inputgroup__right'>
                                    <Input inputAtrribute={{label: 'Min Height: '}} />
                                </div>
                            </div>
                        </div>
                        <div>
                            {WidgetConfigs.subViewSetting}
                        </div>
                        <ButtonGroup>
                            <Button onClick={SaveButton.events.onSave}>{SaveButton.label}</Button>
                            <Button onClick={CancelButton.events.onCancel}>{CancelButton.label}</Button>
                        </ButtonGroup>
                    </div>
                ) : (
                        <span styleName='plus-icon' onClick={RevealSettings}>+</span>
                    )
                }
            </WidgetBody>
        </WidgetContainer>
    );
}, style);
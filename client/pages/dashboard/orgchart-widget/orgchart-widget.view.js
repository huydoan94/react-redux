import React from 'react';
import cssModules from 'react-css-modules';

import style from './orgchart-widget.style.scss';

import { WidgetContainer } from '../components/widgetContainer';
import { WidgetHeader } from '../components/widgetHeader';
import { WidgetBody } from '../components/widgetBody';
import { avatarImg } from './avatar.img';

export const OrgchartWidgetView = cssModules((props) => {
    const { WidgetConfigs } = props,
        { colStyle, minHeight } = props.WidgetStyles,
        { rootContact } = WidgetConfigs;

    return (
        <WidgetContainer colStyle={colStyle} minHeight={minHeight}>
            <WidgetHeader widget={{
                title: WidgetConfigs.title,
                widgetMode: WidgetConfigs.widgetMode,
                buttonEventCatcher: WidgetConfigs.panelEvent
            }} />
            <WidgetBody>
                <section styleName="tree">
                    <ul styleName="tree-root-contact" style={{ transform: 'scale(0.7)' }}>
                        {rootContact !== null && <ContactTemplate rootContact={rootContact} />}
                    </ul>
                </section>
            </WidgetBody>
        </WidgetContainer>
    );
}, style);

const ContactTemplate = cssModules((props) => {
    const { rootContact } = props,
        { id, firstName, lastName, department, employeeId } = rootContact;

    return (
        <li>
            <div styleName='card'>
                <div styleName="card__avatar">
                    <label htmlFor={`${id}-avatar-uploader`}>
                        <img styleName="card__avatar__img" id={`${id}-avatar-img`} src={avatarImg} />
                    </label>
                </div>
                <div styleName="card__detail">
                    <h1 styleName="card__name">{firstName} {lastName}</h1>
                    <p styleName="card__department">{department}</p>
                    <a styleName="card__email" href="#">{employeeId}</a>
                    <p styleName="card__email-domain">@kms-technology.com</p>
                </div>
            </div>

            { rootContact.children.length ?
                <ul>
                    {rootContact.children.map((child) =>
                        <ContactTemplate
                            key={`contact_${child.id}`}
                            rootContact={child}
                        />
                    )}
                </ul>
            : null }
        </li>
    );
}, style);
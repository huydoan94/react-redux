import React from 'react';
import { WidgetHeaderView } from './widget-header.view';

// class WidgetHeader extends React.Component {
//     constructor(props) {
//         super(props);
//         console.log('header');
//         console.log(this.props.widget);
//     }

//     render() {
//         return <WidgetHeaderView widget={this.props.widget} /> 
//     }
// };

// export default WidgetHeader;

export const WidgetHeader = ({widget}) => {
    return <WidgetHeaderView widget={widget} /> 
};

import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export const SelectView = ({ WidgetSelector }) => {
    return (
        <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select</ControlLabel>
            <FormControl componentClass="select" placeholder="select">
                {
                    WidgetSelector.map((option) =>
                    <option key={option.id} value="select">{option.type}</option>)
                };
            </FormControl>
        </FormGroup>
    );
};

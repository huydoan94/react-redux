import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export const SelectView = ({ WidgetSelector }) => {
    const { label, options, events } = WidgetSelector;

    return (
        <FormGroup controlId="formControlsSelect">
            <ControlLabel>{label}</ControlLabel>
            <FormControl componentClass="select"
                placeholder="select"
                onChange={events.onSelectorChange}
            >
                {
                    options.map((option) =>
                        <option
                            key={option.id}
                            id={option.id}
                            value={option.type}
                        >
                            {option.type}
                        </option>)
                };
            </FormControl>
        </FormGroup>
    );
};

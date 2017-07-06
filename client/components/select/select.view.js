import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export const Select = ({ WidgetSelector }) => {
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
                            key={`selectOption_${option.id}`}
                            id={`selectOption_${option.id}`}
                            value={option.type}
                            selected={option.selected}
                        >
                            {option.type}
                        </option>)
                };
            </FormControl>
        </FormGroup>
    );
};

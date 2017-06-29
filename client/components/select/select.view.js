import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export const SelectView = ({ WidgetSelector }) => {
    const { label, options, events } = WidgetSelector,
        defaultValue = (options.filter((option) => option.selected === true))[0];

    return (
        <FormGroup controlId="formControlsSelect">
            <ControlLabel>{label}</ControlLabel>
            <FormControl componentClass="select"
                placeholder="select"
                onChange={events.onSelectorChange}
                defaultValue={defaultValue ? defaultValue.type : null}
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

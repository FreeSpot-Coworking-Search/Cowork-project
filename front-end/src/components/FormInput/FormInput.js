import './formInput.css';
import React from 'react';

export default function FormInput({ children, name }) {
    const Icon = React.cloneElement(
        children[0],
        { className: 'label-icon' },
        null
    );
    const Input = React.cloneElement(
        children[1],
        { name, id: name, className: 'label-input' },
        null
    );

    return (
        <label htmlFor={name} className="label">
            {Icon}
            {Input}
        </label>
    );
}

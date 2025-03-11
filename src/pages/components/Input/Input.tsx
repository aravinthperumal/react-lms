import React, { KeyboardEvent, useState, useCallback } from 'react';

import { ErrorMessage, StyledInput } from './Input.sc';

interface InputProps {
    type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'checkbox';
    placeholder?: string;
    value: string | number;
    name: string;
    onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
    isDisabled?: boolean;
    hasError?: boolean;
    errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
    type = 'text',
    placeholder = '',
    value,
    name,
    onChange,
    onBlur,
    hasError,
    isDisabled,
    errorMessage,
    onKeyDown,
}) => {
    const [show, setShow] = useState(false);

    const handleToggleShow = useCallback(() => {
        setShow((prev) => !prev);
    }, []);

    return (
        <div>
            <StyledInput
                type={show && type === 'password' ? 'text' : type}
                placeholder={placeholder}
                value={value}
                name={name}
                disabled={isDisabled}
                $hasError={hasError}
                onBlur={onBlur}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />

            {type === 'password' && (
                <label>
                    <input type="checkbox" disabled={isDisabled} onChange={handleToggleShow} checked={show} />
                    {' Show'}
                </label>
            )}

            {hasError && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </div>
    );
};

export default Input;

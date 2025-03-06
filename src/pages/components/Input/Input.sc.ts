import styled from 'styled-components';

interface StyledInputProps {
    $hasError?: boolean;
}
export const StyledInput = styled.input<StyledInputProps>`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 4px;
    background-color: '#fff';
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
    border: 1px solid ${(props) => (props.$hasError ? 'red' : '#ccc')};

    &::placeholder {
        color: #999;
    }
`;

export const ErrorMessage = styled.span`
    color: red;
    font-size: 12px;
    margin-top: 5px;
    display: block;
`;

import styled from 'styled-components';

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 400px;
    margin: auto;
`;

export const Label = styled.label`
    font-weight: bold;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const CloseButton = styled.button`
    padding: 10px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #d32f2f;
    }
`;

export const Error = styled.span`
    color: red;
    font-size: 12px;
`;

export const Info = styled.span`
    color: green;
    font-size: 14px;
`;

export const TableButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
`;

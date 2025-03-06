import styled from 'styled-components';

export const LoginCardWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 5px 5px 5px 5px rgba(26, 9, 121, 0.1);
    width: 100%;
    border-bottom: solid 6px rgb(3, 12, 94);
    max-width: 400px;
    min-height: 400px;
`;

export const LoginTitle = styled.h2`
    text-align: center;
    margin-bottom: 20px;
    color: rgb(3, 12, 94);
    font-weight: bold;
`;

export const SubmitButton = styled.button`
    width: 50%;
    padding: 10px;
    background-color: rgb(3, 12, 94);
    color: #fff;
    border: none;
    align-self: center;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
        background-color: rgb(30, 134, 231);
    }

    &:disabled {
        background-color: rgb(148, 142, 142);
    }
`;

export const ErrorText = styled.span`
    color: red;
    margin-top: 10px;
`;

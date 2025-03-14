import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { useDispatch } from '_state/useDispatch';

import { LOCALSTORAGE_USER } from 'globals/constants';

import Input from 'pages/components/input/Input';

import { fetchUserData } from 'utils/api';
import { isEnterKey } from 'utils/functions/keyboardFunctions';
import { isEmpty, isValidEmail } from 'utils/functions/validationFunctions';
import { setToLocalStorage } from 'utils/localStorage/localStorage';

import { login } from './_state/userSlice';
import { ErrorText, LoginCardWrapper, LoginContainer, LoginTitle, SubmitButton } from './Login.sc';

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [formError, setFormError] = useState({ name: '', password: '' });

    const isLoginAllowed = useMemo(
        () => isEmpty(formError.password) && isEmpty(formError.name) && username && password,
        [formError.name, formError.password, password, username],
    );

    const validateEmail = useCallback((email: string) => {
        if (isEmpty(email)) {
            setFormError((prev) => ({ ...prev, name: 'Email is required' }));
        } else if (!isValidEmail(email)) {
            setFormError((prev) => ({ ...prev, name: 'Invalid email format' }));
        } else {
            setFormError((prev) => ({ ...prev, name: '' }));
        }
    }, []);

    const onChangeUserName = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(event.target.value);
            validateEmail(event.target.value);
        },
        [validateEmail],
    );

    const onChangePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }, []);

    const handleSubmit = useCallback(async () => {
        try {
            const data = await fetchUserData(username, password);
            if (data) {
                //persist the login detail for page refresh
                setToLocalStorage(LOCALSTORAGE_USER, data);
                dispatch(login({ user: data }));
                navigate('/', { replace: true });
            } else {
                setError('invalid username / password');
            }
        } catch (e) {
            console.log('Server error', e);
            toast.error('Server error occurred! Please try again', {
                position: 'bottom-right',
            });
        }
    }, [username, password, dispatch, navigate]);

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent) => {
            if (isEnterKey(event) && isLoginAllowed) {
                handleSubmit();
            }
        },
        [handleSubmit, isLoginAllowed],
    );

    return (
        <LoginCardWrapper>
            <LoginContainer>
                <LoginTitle>Login</LoginTitle>
                <Input
                    name="username"
                    value={username}
                    type="email"
                    onChange={onChangeUserName}
                    placeholder="Username"
                    hasError={!isEmpty(formError.name)}
                    errorMessage={formError.name}
                    onKeyDown={handleKeyDown}
                />
                <Input
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    type="password"
                    placeholder="Password"
                    errorMessage={formError.password}
                    hasError={!isEmpty(formError.password)}
                    onKeyDown={handleKeyDown}
                />

                <SubmitButton disabled={!isLoginAllowed} onClick={handleSubmit}>
                    Login
                </SubmitButton>
                {error && <ErrorText>{error}</ErrorText>}
            </LoginContainer>
        </LoginCardWrapper>
    );
};

export default Login;

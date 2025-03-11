import { useDispatch } from '_state/useDispatch';
import { useSelector } from '_state/useSelector';
import { useFormik } from 'formik';
import { LOCALSTORAGE_USER } from 'globals/constants';
import Button from 'pages/components/button/Button';
import { ButtonWrapper, CloseButton, Error, FormContainer, Label } from 'pages/components/formWrapper/FormWrapper.sc';
import Input from 'pages/components/input/Input';
import { useCallback, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { toast } from 'react-toastify';
import { setToLocalStorage } from 'utils/localStorage/localStorage';
import { User } from 'utils/types';

import { resetError, updateUser } from '../_state/userSlice';

import { validationSchema } from './validationSchema';

export const UserProfile: React.FC = () => {
    const { error, user, isLoading } = useSelector(({ user }) => user, shallowEqual);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const resetErrors = useCallback(() => {
        dispatch(resetError());
    }, [dispatch]);

    const onSave = useCallback(
        async (values: User) => {
            await dispatch(updateUser(values)).unwrap();
            setToLocalStorage(LOCALSTORAGE_USER, values);
            toast.success('Profile updated successfully');
            setIsEditing(false);
            resetErrors();
        },
        [dispatch, resetErrors],
    );

    const formik = useFormik<User>({
        initialValues: {
            ...user,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onSave(values);
        },
        enableReinitialize: true,
    });

    const { handleSubmit, touched, errors, getFieldProps, resetForm, dirty } = formik;

    const onCancel = useCallback(() => {
        setIsEditing(false);
        resetForm();
        dispatch(resetError());
    }, [dispatch, resetForm]);

    const onEdit = useCallback(() => {
        setIsEditing(true);
    }, []);

    return (
        <>
            <FormContainer onSubmit={handleSubmit}>
                <h2>Profile</h2>
                <Label>Name</Label>
                <Input isDisabled={!isEditing} {...getFieldProps('name')} />
                {touched.name && errors.name && <Error>{errors.name}</Error>}
                <Label>Email</Label>
                <Input isDisabled={!isEditing} {...getFieldProps('username')} />
                {touched.username && errors.username && <Error>{errors.username}</Error>}
                <Label>Password</Label>
                <Input type="password" isDisabled={!isEditing} {...getFieldProps('password')} />
                {touched.password && errors.password && <Error>{errors.password}</Error>}
                <Label>Role</Label>
                <Input isDisabled {...getFieldProps('role')} />
                <ButtonWrapper>
                    <CloseButton type="button" onClick={onCancel}>
                        Cancel
                    </CloseButton>
                    {isEditing ? (
                        <Button disabled={!dirty || isLoading} type="submit">
                            Save
                        </Button>
                    ) : (
                        <Button type="button" onClick={onEdit}>
                            Edit
                        </Button>
                    )}
                </ButtonWrapper>
                {error && <Error>{error}</Error>}
            </FormContainer>
        </>
    );
};

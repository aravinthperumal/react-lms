import { useDispatch } from '_state/useDispatch';
import { useFormik } from 'formik';
import { EDIT_MODE, EMPTY_LIST, EMPTY_VALUE } from 'globals/constants';
import Button from 'pages/components/button/Button';
import { ButtonWrapper, CloseButton, Error, FormContainer, Label } from 'pages/components/formWrapper/FormWrapper.sc';
import Input from 'pages/components/input/Input';
import { addStudent, updateStudent } from 'pages/studentList/_state/studentSlice';
import { Student } from 'pages/studentList/_state/types';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { checkIfStudentExists } from 'utils/functions/arrayObjectFunctions';

import { validationSchema } from './validationSchema';

interface StudentDialogProps {
    studentList: Student[];
    previousStudent: Student | null;
    editMode: EDIT_MODE;
    onClose: () => void;
}

export const StudentDialog: React.FC<StudentDialogProps> = ({ editMode, studentList, onClose, previousStudent }) => {
    const dispatch = useDispatch();
    const isAddMode = editMode === EDIT_MODE.ADD;
    const [error, setError] = useState<string>('');

    const handleAddCallback = useCallback(
        (data: Student) => {
            const isAlreadyExist = checkIfStudentExists(studentList, data.name, data.email);
            if (!isAlreadyExist) {
                dispatch(
                    addStudent({
                        department: data.department,
                        email: data.email,
                        name: data.name,
                        booksBorrowed: data.booksBorrowed,
                    }),
                );
                toast.info('Student added successfully');
                onClose();
            } else {
                setError('Student with this name and email already exist');
            }
        },
        [dispatch, onClose, studentList],
    );

    const handleEditCallback = useCallback(
        (data: Student) => {
            dispatch(updateStudent(data));
            toast.info('Student updated successfully');
            onClose();
        },
        [dispatch, onClose],
    );

    const formik = useFormik<Student>({
        initialValues: {
            name: previousStudent?.name ?? EMPTY_VALUE,
            email: previousStudent?.email ?? EMPTY_VALUE,
            department: previousStudent?.department ?? EMPTY_VALUE,
            booksBorrowed: previousStudent?.booksBorrowed ?? EMPTY_LIST,
            id: previousStudent?.id ?? EMPTY_VALUE,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setError(EMPTY_VALUE);
            return isAddMode ? handleAddCallback(values) : handleEditCallback(values);
        },
    });

    const { dirty, errors, touched, handleSubmit } = formik;

    return (
        <FormContainer onSubmit={handleSubmit}>
            <h2>{isAddMode ? 'Add Student' : 'Edit Student'}</h2>
            {!isAddMode && (
                <>
                    <Label>Id</Label>
                    <Input placeholder="id" isDisabled {...formik.getFieldProps('id')} />
                </>
            )}

            <Label>Name</Label>
            <Input placeholder={'name'} {...formik.getFieldProps('name')} />
            {errors.name && touched.name && <Error>{errors.name}</Error>}

            <Label>Email</Label>
            <Input placeholder="email" {...formik.getFieldProps('email')} />
            {errors.email && touched.email && <Error>{errors.email}</Error>}

            <Label>Department</Label>
            <Input placeholder="department" {...formik.getFieldProps('department')} />
            {errors.department && touched.department && <Error>{errors.department}</Error>}

            <ButtonWrapper>
                <CloseButton type="button" onClick={onClose}>
                    Close
                </CloseButton>
                <Button disabled={!dirty} type="submit">
                    {isAddMode ? 'Add' : 'Save'}
                </Button>
            </ButtonWrapper>
            {error && <Error>{error}</Error>}
        </FormContainer>
    );
};

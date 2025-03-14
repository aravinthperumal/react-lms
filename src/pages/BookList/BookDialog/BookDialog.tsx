import { useFormik } from 'formik';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { useDispatch } from '_state/useDispatch';

import { EDIT_MODE, EMPTY_VALUE, NUMBER_ONE, NUMBER_ZERO } from 'globals/constants';

import { addBook, updateBook } from 'pages/bookList/_state/bookSlice';
import { Book } from 'pages/bookList/_state/types';
import Button from 'pages/components/button/Button';
import {
    ButtonWrapper,
    CloseButton,
    Error,
    FormContainer,
    Info,
    Label,
} from 'pages/components/formWrapper/FormWrapper.sc';
import Input from 'pages/components/input/Input';

import { isISBNUnique } from 'utils/functions/arrayObjectFunctions';

import { bookValidationSchema } from './validationSchema';

interface BookDialogProps {
    bookList: Book[];
    previousBook: Book | null;
    editMode: EDIT_MODE;
    onClose: () => void;
}

export const BookDialog: React.FC<BookDialogProps> = ({ editMode, bookList, onClose, previousBook }) => {
    const dispatch = useDispatch();
    const isAddMode = editMode === EDIT_MODE.ADD;
    const [error, setError] = useState<string>('');
    const [prevTotalCopies, setPrevTotalCopies] = useState<number>(previousBook?.totalCopies ?? NUMBER_ZERO);

    const handleAddCallback = useCallback(
        (data: Book) => {
            dispatch(
                addBook({
                    author: data.author,
                    availableCopies: data.availableCopies,
                    category: data.category,
                    isbn: data.isbn,
                    title: data.title,
                    totalCopies: data.totalCopies,
                }),
            );
            toast.info('Book added successfully');
            onClose();
        },
        [dispatch, onClose],
    );

    const handleEditCallback = useCallback(
        (data: Book) => {
            dispatch(updateBook(data));
            toast.info('Book updated successfully');
            onClose();
        },
        [dispatch, onClose],
    );

    // to manage total copies decrement limit in edit mode based on previous total and available copies
    const totalCopiesLimit = useMemo(() => {
        if (isAddMode) return NUMBER_ONE;
        return (previousBook?.totalCopies ?? NUMBER_ZERO) - (previousBook?.availableCopies ?? NUMBER_ZERO);
    }, [isAddMode, previousBook]);

    const formik = useFormik({
        initialValues: {
            title: previousBook?.title ?? EMPTY_VALUE,
            author: previousBook?.author ?? EMPTY_VALUE,
            category: previousBook?.category ?? EMPTY_VALUE,
            isbn: previousBook?.isbn ?? EMPTY_VALUE,
            totalCopies: previousBook?.totalCopies ?? NUMBER_ONE,
            availableCopies: previousBook?.availableCopies ?? NUMBER_ONE,
            id: previousBook?.id ?? EMPTY_VALUE,
        },
        validationSchema: bookValidationSchema(totalCopiesLimit || NUMBER_ONE),
        onSubmit: (values) => {
            setError('');
            if (isAddMode && !isISBNUnique(bookList, values.isbn)) {
                setError('A book with this ISBN already exists.');
                return;
            }
            return isAddMode ? handleAddCallback(values) : handleEditCallback(values);
        },
    });

    const { errors, setFieldValue, touched, values, dirty, handleSubmit } = formik;

    useEffect(() => {
        if (isAddMode) {
            setFieldValue('availableCopies', values.totalCopies);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.totalCopies, isAddMode]); //it should be only affected when total copies changed

    useEffect(() => {
        const diff = values.totalCopies - prevTotalCopies;
        if (!isAddMode && diff !== 0) {
            const newAvailableCopies = values.availableCopies + diff;
            setFieldValue('availableCopies', newAvailableCopies);
        }

        // Update to current totalCopies after changed
        setPrevTotalCopies(values.totalCopies);
    }, [
        formik.values.totalCopies,
        isAddMode,
        formik,
        prevTotalCopies,
        values.totalCopies,
        setFieldValue,
        values.availableCopies,
    ]);

    return (
        <FormContainer onSubmit={handleSubmit}>
            <h2>{isAddMode ? 'Add Book' : 'Edit Book'}</h2>
            {!isAddMode && (
                <>
                    <Label>Id</Label>
                    <Input placeholder="id" isDisabled {...formik.getFieldProps('id')} />
                </>
            )}

            <Label>Title</Label>
            <Input placeholder="title" {...formik.getFieldProps('title')} />
            {formik.errors.title && formik.touched.title && <Error>{formik.errors.title}</Error>}

            <Label>Author</Label>
            <Input placeholder="author" {...formik.getFieldProps('author')} />
            {errors.author && touched.author && <Error>{errors.author}</Error>}

            <Label>Category</Label>
            <Input placeholder="category" {...formik.getFieldProps('category')} />
            {errors.category && touched.category && <Error>{errors.category}</Error>}

            <Label>ISBN</Label>
            <Input placeholder="isbn" isDisabled={!isAddMode} {...formik.getFieldProps('isbn')} />
            {errors.isbn && touched.isbn && <Error>{errors.isbn}</Error>}

            <Label>Total Copies</Label>
            <Input placeholder="totalCopies" type="number" {...formik.getFieldProps('totalCopies')} />
            {errors.totalCopies && touched.totalCopies && <Error>{errors.totalCopies}</Error>}

            <Label>Available Copies</Label>
            <Input
                placeholder="availableCopies"
                isDisabled
                type="number"
                {...formik.getFieldProps('availableCopies')}
            />
            {errors.availableCopies && touched.availableCopies && <Error>{errors.availableCopies}</Error>}

            <ButtonWrapper>
                <CloseButton type="button" onClick={onClose}>
                    Close
                </CloseButton>
                <Button disabled={!dirty} type="submit">
                    {isAddMode ? 'Add' : 'Save'}
                </Button>
            </ButtonWrapper>
            {error && <Error>{error}</Error>}
            {!isAddMode && <Info>{`Total number of book copies already in use ${totalCopiesLimit}`}</Info>}
        </FormContainer>
    );
};

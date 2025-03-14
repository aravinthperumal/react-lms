import { useFormik } from 'formik';
import React, { useCallback } from 'react';
import { toast } from 'react-toastify';

import { useDispatch } from '_state/useDispatch';

import { BOOK_RETURNED, EMPTY_VALUE } from 'globals/constants';

import Button from 'pages/components/button/Button';
import { ButtonWrapper, CloseButton, FormContainer, Label } from 'pages/components/formWrapper/FormWrapper.sc';
import Input from 'pages/components/input/Input';

import { calculatePenalty, todayDate } from 'utils/functions/arrayObjectFunctions';

import { returnBook } from '../_state/bookTransactionSlice';
import { BookTransaction } from '../_state/types';

interface BookReturnDialog {
    bookTransaction: BookTransaction | null;
    onClose: () => void;
}

export const BookReturnDialog: React.FC<BookReturnDialog> = ({ bookTransaction, onClose }) => {
    const dispatch = useDispatch();
    const onSubmit = useCallback(
        (data: BookTransaction) => {
            dispatch(returnBook(data));
            toast.info('Book return entry updated');
            onClose();
        },
        [dispatch, onClose],
    );
    const formik = useFormik<BookTransaction>({
        initialValues: {
            bookId: bookTransaction?.bookId ?? EMPTY_VALUE,
            bookName: bookTransaction?.bookName ?? EMPTY_VALUE,
            id: bookTransaction?.id ?? EMPTY_VALUE,
            dueDate: bookTransaction?.dueDate ?? EMPTY_VALUE,
            issueDate: bookTransaction?.issueDate ?? EMPTY_VALUE,
            penalty: calculatePenalty(bookTransaction?.dueDate ?? EMPTY_VALUE),
            returnDate: todayDate(),
            status: BOOK_RETURNED,
            studentId: bookTransaction?.studentId ?? EMPTY_VALUE,
            studentName: bookTransaction?.studentName ?? EMPTY_VALUE,
        },
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    return (
        <FormContainer onSubmit={formik.handleSubmit}>
            <h2>Return Book</h2>
            <Label>Student Name</Label>
            <Input isDisabled {...formik.getFieldProps('studentName')} />

            <Label>Book Name</Label>
            <Input isDisabled placeholder="bookName" {...formik.getFieldProps('bookName')} />

            <Label>IssueDate Name</Label>
            <Input placeholder="issueDate" type="date" isDisabled {...formik.getFieldProps('issueDate')} />

            <Label>Due Date</Label>
            <Input type="date" isDisabled placeholder="dueDate" {...formik.getFieldProps('dueDate')} />

            <Label>Actual return date</Label>
            <Input type="date" isDisabled placeholder="returnDate" {...formik.getFieldProps('returnDate')} />

            <Label>Late Penalty</Label>
            <Input placeholder="penalty" isDisabled {...formik.getFieldProps('penalty')} />

            <ButtonWrapper>
                <CloseButton type="button" onClick={onClose}>
                    Close
                </CloseButton>
                <Button type="submit">{'Confirm Return'}</Button>
            </ButtonWrapper>
        </FormContainer>
    );
};

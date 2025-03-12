import { useDispatch } from '_state/useDispatch';
import { useSelector } from '_state/useSelector';
import { useFormik } from 'formik';
import { BOOK_ISSUED, EMPTY_VALUE, MAX_BOOK_LIMIT, NUMBER_ZERO } from 'globals/constants';
import { fetchBooks } from 'pages/bookList/_state/bookSlice';
import { issueBook } from 'pages/bookReturnEntry/_state/bookTransactionSlice';
import { BookTransaction } from 'pages/bookReturnEntry/_state/types';
import Button from 'pages/components/button/Button';
import { Dropdown } from 'pages/components/dropdown/Dropdown';
import { Error, FormContainer, Label } from 'pages/components/formWrapper/FormWrapper.sc';
import Input from 'pages/components/input/Input';
import { fetchStudents } from 'pages/studentList/_state/studentSlice';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { selectOptions, todayDate } from 'utils/functions/arrayObjectFunctions';

import { validationSchema } from './validationSchema';

type FormFields = Omit<BookTransaction, 'id'>;

export const BookTakenEntry: React.FC = () => {
    const dispatch = useDispatch();
    const { bookList } = useSelector((state) => state.book);
    const { studentList } = useSelector((state) => state.student);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    useEffect(() => {
        dispatch(fetchBooks({}));
        dispatch(fetchStudents({}));
    }, [dispatch]);

    const studentOptions = useMemo(() => selectOptions(studentList, 'name', 'id'), [studentList]);
    const bookOptions = useMemo(() => selectOptions(bookList, 'title', 'id'), [bookList]);

    const onSubmit = useCallback(
        (values: FormFields) => {
            dispatch(issueBook(values));
        },
        [dispatch],
    );

    const formik = useFormik<FormFields>({
        initialValues: {
            studentId: EMPTY_VALUE,
            studentName: EMPTY_VALUE,
            bookId: EMPTY_VALUE,
            bookName: EMPTY_VALUE,
            issueDate: todayDate(),
            dueDate: EMPTY_VALUE,
            returnDate: EMPTY_VALUE,
            status: BOOK_ISSUED,
            penalty: NUMBER_ZERO,
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            setFormErrors([]);
            const errors: string[] = [];
            const student = studentList.find((student) => student.id === values.studentId);

            const book = bookList.find((book) => book.id === values.bookId);

            if (book && book.availableCopies <= NUMBER_ZERO) {
                errors.push('Selected book is not available for borrowing.');
            }
            if (student && student.booksBorrowed.length >= MAX_BOOK_LIMIT) {
                errors.push('Student reached maximum book count');
            }
            if (errors.length > 0) {
                setFormErrors(errors);
                return;
            }
            onSubmit({
                ...values,
                bookName: book?.title ?? EMPTY_VALUE,
                studentName: student?.name ?? EMPTY_VALUE,
            });
            resetForm();
            toast.info('Book issued successfully');
        },
    });

    const { handleSubmit, touched, errors } = formik;

    return (
        <FormContainer onSubmit={handleSubmit}>
            <h2>{'Book Taken Entry'}</h2>
            <Label>Student</Label>
            <Dropdown options={studentOptions} {...formik.getFieldProps('studentId')} />
            {touched.studentId && errors.studentId && <Error>{errors.studentId}</Error>}

            <Label>Book</Label>
            <Dropdown options={bookOptions} {...formik.getFieldProps('bookId')} />
            {touched.bookId && errors.bookId && <Error>{errors.bookId}</Error>}

            <Label>Issue Date</Label>
            <Input type="date" placeholder="issueDate" isDisabled {...formik.getFieldProps('issueDate')} />

            <Label>Last Date To Return</Label>
            <Input placeholder="dueDate" type="date" {...formik.getFieldProps('dueDate')} />
            {touched.dueDate && errors.dueDate && <Error>{errors.dueDate}</Error>}

            {formErrors && formErrors.map((error, i) => <Error key={i}>{error}</Error>)}
            <Button type="submit">Submit</Button>
        </FormContainer>
    );
};

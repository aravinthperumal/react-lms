import * as Yup from 'yup';
const isbnRegex = /^(?:\d{9}[\dX]|\d{13})$/; // as per standard

export const bookValidationSchema = (totalCopiesLimit: number) =>
    Yup.object().shape({
        title: Yup.string().typeError('Title must be a string').required('Title is required'),
        author: Yup.string().typeError('Title must be a string').required('Author is required'),
        category: Yup.string().typeError('Title must be a string').required('Category is required'),
        isbn: Yup.string()
            .matches(isbnRegex, 'ISBN should be a valid 10 or 13 digit number')
            .required('ISBN Number is required'),
        totalCopies: Yup.number()
            .required('Total Copies is required')
            .integer('Total Copies must be an integer')
            .min(totalCopiesLimit, `Total copies must be ${totalCopiesLimit}`),
        availableCopies: Yup.number()
            .required('Available Copies is required')
            .integer('Available Copies must be an integer')
            .min(0, 'Available Copies cannot be negative'),
    });

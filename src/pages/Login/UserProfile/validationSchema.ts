import * as Yup from 'yup';

import { emailRegex } from 'utils/functions/validationFunctions';

export const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
    username: Yup.string().matches(emailRegex, 'Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

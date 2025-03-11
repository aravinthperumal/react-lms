import { emailRegex } from 'utils/functions/validationFunctions';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().matches(emailRegex, 'Invalid email format').required('Email is required'),
    department: Yup.string().required('Department is required'),
});

import { useDispatch } from '_state/useDispatch';
import DeleteDialog from 'pages/components/deleteDialog/DeleteDialog';
import { deleteStudent } from 'pages/studentList/_state/studentSlice';
import React, { useCallback } from 'react';
import { toast } from 'react-toastify';

import { Student } from '../_state/types';

interface StudentDialogProps {
    selectedStudent: Student | null;
    onClose: () => void;
}

export const DeleteStudentDialog: React.FC<StudentDialogProps> = ({ selectedStudent, onClose }) => {
    const dispatch = useDispatch();

    const handleDelete = useCallback(() => {
        if (selectedStudent) {
            dispatch(deleteStudent(selectedStudent.id));
            toast.info('Student deleted successfully');
            onClose();
        }
    }, [dispatch, onClose, selectedStudent]);

    return (
        <DeleteDialog
            label="Are you sure want to delete this student ?"
            onClose={onClose}
            onDelete={handleDelete}
            title="Delete student"
        />
    );
};

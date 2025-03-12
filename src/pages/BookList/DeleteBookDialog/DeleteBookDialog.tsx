import { useDispatch } from '_state/useDispatch';
import { deleteBook } from 'pages/bookList/_state/bookSlice';
import DeleteDialog from 'pages/components/deleteDialog/DeleteDialog';
import React, { useCallback } from 'react';
import { toast } from 'react-toastify';

import { Book } from '../_state/types';

interface DeleteBookDialogProps {
    selectedBook: Book | null;
    onClose: () => void;
}

export const DeleteBookDialog: React.FC<DeleteBookDialogProps> = ({ selectedBook, onClose }) => {
    const dispatch = useDispatch();
    const handleDelete = useCallback(() => {
        if (selectedBook) {
            dispatch(deleteBook(selectedBook.id));
            toast.info('Book deleted successfully');
            onClose();
        }
    }, [dispatch, onClose, selectedBook]);

    return (
        <DeleteDialog
            label="Are you sure want to delete this book ?"
            onClose={onClose}
            onDelete={handleDelete}
            title="Delete book"
        />
    );
};

import { BOOK_ISSUED } from 'globals/constants';
import Button from 'pages/components/button/Button';
import { Column } from 'pages/components/table/Table';

import { BookTransaction } from './_state/types';

export interface ExtendedBookTransaction extends BookTransaction {
    actions?: string;
}

export const transactionsColumns = (
    onReturnBook: (bookTransaction: BookTransaction) => void,
): Column<ExtendedBookTransaction>[] => [
    {
        id: 'id',
        label: 'Id',
    },
    {
        id: 'studentId',
        label: 'Student Id',
    },
    {
        id: 'studentName',
        label: 'Student Name',
    },
    {
        id: 'bookName',
        label: 'BookName',
    },
    {
        id: 'issueDate',
        label: 'Issued Date',
    },
    {
        id: 'dueDate',
        label: 'Due Date',
    },
    {
        id: 'returnDate',
        label: 'Actual Return Date',
    },
    {
        id: 'status',
        label: 'Book Status',
    },
    {
        id: 'penalty',
        label: 'Penalty Charges',
    },
    {
        id: 'actions',
        render: (row) => {
            const { status } = row;
            return (
                <Button disabled={status !== BOOK_ISSUED} onClick={() => onReturnBook(row)}>
                    Return Book
                </Button>
            );
        },
    },
];

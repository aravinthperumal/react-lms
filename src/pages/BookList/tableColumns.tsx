import Button from 'pages/components/button/Button';
import { TableButtonWrapper } from 'pages/components/formWrapper/FormWrapper.sc';
import { Column } from 'pages/components/table/Table';

import { Book } from './_state/types';

export interface ExtendedBook extends Book {
    actions?: string; //for button action accessor to avoid list key error
}

export const bookColumns = (
    onEdit: (student: Book) => void,
    onDelete: (student: Book) => void,
    isAdmin: boolean,
): Column<ExtendedBook>[] => {
    const columns: Column<ExtendedBook>[] = [
        {
            id: 'id',
            label: 'Id',
        },
        {
            id: 'title',
            label: 'Title',
        },
        {
            id: 'author',
            label: 'Author',
        },
        {
            id: 'category',
            label: 'Category',
        },
        {
            id: 'isbn',
            label: 'ISBN Number',
        },
        {
            id: 'totalCopies',
            label: 'Total copies',
        },
        {
            id: 'availableCopies',
            label: 'Available copies',
        },
    ];
    if (isAdmin) {
        columns.push({
            id: 'actions',
            render: (row) => (
                <TableButtonWrapper>
                    <Button onClick={() => onEdit(row)}>Edit</Button>
                    <Button onClick={() => onDelete(row)}>Delete</Button>
                </TableButtonWrapper>
            ),
        });
    }

    return columns;
};

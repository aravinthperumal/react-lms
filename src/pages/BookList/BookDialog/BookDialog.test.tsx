import { previousBook } from 'test/__mocks__/bookListMock';

import { EMPTY_VALUE, EDIT_MODE, NUMBER_ONE } from 'globals/constants';

import { renderWithProviders, act, screen, fireEvent } from 'utils/test-utils';

import { Book } from '../_state/types';

import { BookDialog } from './BookDialog';

describe('render BookDialog', () => {
    const mockOnClose = jest.fn();
    it('render form with empty values for add mode', async () => {
        await act(async () => {
            renderWithProviders(
                <BookDialog previousBook={{} as Book} bookList={[]} editMode={EDIT_MODE.ADD} onClose={mockOnClose} />,
            );
        });

        expect(screen.getByPlaceholderText('title')).toHaveValue(EMPTY_VALUE);
        expect(screen.getByPlaceholderText('author')).toHaveValue(EMPTY_VALUE);
        expect(screen.getByPlaceholderText('category')).toHaveValue(EMPTY_VALUE);
        expect(screen.getByPlaceholderText('isbn')).toHaveValue(EMPTY_VALUE);
        expect(screen.getByPlaceholderText('totalCopies')).toHaveValue(NUMBER_ONE);
        expect(screen.getByPlaceholderText('availableCopies')).toHaveValue(NUMBER_ONE);
    });

    it('render form with previous book values for edit mode', async () => {
        await act(async () => {
            renderWithProviders(
                <BookDialog
                    previousBook={previousBook}
                    bookList={[]}
                    editMode={EDIT_MODE.EDIT}
                    onClose={mockOnClose}
                />,
            );
        });

        expect(screen.getByPlaceholderText('title')).toHaveValue(previousBook.title);
        expect(screen.getByPlaceholderText('author')).toHaveValue(previousBook.author);
        expect(screen.getByPlaceholderText('category')).toHaveValue(previousBook.category);
        expect(screen.getByPlaceholderText('isbn')).toHaveValue(previousBook.isbn);
        expect(screen.getByPlaceholderText('totalCopies')).toHaveValue(previousBook.totalCopies);
        expect(screen.getByPlaceholderText('availableCopies')).toHaveValue(previousBook.availableCopies);
    });

    it('calls onClose when Close button is clicked', async () => {
        await act(async () => {
            renderWithProviders(
                <BookDialog previousBook={{} as Book} bookList={[]} editMode={EDIT_MODE.ADD} onClose={mockOnClose} />,
            );
        });
        const closeButton = screen.getByText('Close');
        fireEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});

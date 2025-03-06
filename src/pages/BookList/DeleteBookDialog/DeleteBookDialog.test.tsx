import { fireEvent, renderWithProviders, screen } from 'utils/test-utils';

import { DeleteBookDialog } from './DeleteBookDialog';

describe('render DeleteStudentDialog', () => {
    const mockOnClose = jest.fn();

    const selectedStudent = {
        id: '1',
        title: 'React',
        author: 'martin',
        category: 'IT',
        isbn: '9780262033848',
        totalCopies: 2,
        availableCopies: 2,
    };

    const setup = () => renderWithProviders(<DeleteBookDialog selectedBook={selectedStudent} onClose={mockOnClose} />);

    it('delete dialog with correct title and label', () => {
        setup();

        expect(screen.getByText('Delete book')).toBeInTheDocument();
        expect(screen.getByText('Are you sure want to delete this book ?')).toBeInTheDocument();
    });

    it('call onClose when close button is clicked', () => {
        setup();

        fireEvent.click(screen.getByText('Close'));

        expect(mockOnClose).toHaveBeenCalled();
    });
});

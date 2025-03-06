import { fireEvent, renderWithProviders, screen } from 'utils/test-utils';

import { DeleteStudentDialog } from './DeleteStudentDialog';

describe('render DeleteStudentDialog', () => {
    const mockOnClose = jest.fn();

    const selectedStudent = {
        id: '1',
        name: 'test',
        email: 'test@gmail.com',
        department: 'lamp',
        booksBorrowed: [],
    };

    const setup = () =>
        renderWithProviders(<DeleteStudentDialog selectedStudent={selectedStudent} onClose={mockOnClose} />);

    it('delete dialog with correct title and label', () => {
        setup();

        expect(screen.getByText('Delete student')).toBeInTheDocument();
        expect(screen.getByText('Are you sure want to delete this student ?')).toBeInTheDocument();
    });

    it('call onClose when close button is clicked', () => {
        setup();

        fireEvent.click(screen.getByText('Close'));
        expect(mockOnClose).toHaveBeenCalled();
    });
});

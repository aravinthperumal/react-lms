import { fireEvent, screen, waitFor } from '@testing-library/react';
import { mockStudent } from 'test/__mocks__/studentListMock';

import { EDIT_MODE } from 'globals/constants';

import { renderWithProviders } from 'utils/test-utils';

import { Student } from '../_state/types';

import { StudentDialog } from './StudentDialog';

describe('render StudentDialog', () => {
    const mockOnClose = jest.fn();

    it('renders Student form', () => {
        renderWithProviders(
            <StudentDialog
                studentList={[]}
                previousStudent={{} as Student}
                editMode={EDIT_MODE.ADD}
                onClose={mockOnClose}
            />,
        );

        expect(screen.getByText('Add Student')).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/department/i)).toBeInTheDocument();
    });

    it('renders Edit Student form', () => {
        renderWithProviders(
            <StudentDialog
                studentList={[mockStudent]}
                previousStudent={mockStudent}
                editMode={EDIT_MODE.EDIT}
                onClose={mockOnClose}
            />,
        );

        expect(screen.getByText('Edit Student')).toBeInTheDocument();
        expect(screen.getByDisplayValue(mockStudent.name)).toBeInTheDocument();
        expect(screen.getByDisplayValue(mockStudent.email)).toBeInTheDocument();
        expect(screen.getByDisplayValue(mockStudent.department)).toBeInTheDocument();
    });

    it('calls onClose when Close button is clicked', async () => {
        renderWithProviders(
            <StudentDialog
                studentList={[]}
                previousStudent={{} as Student}
                editMode={EDIT_MODE.ADD}
                onClose={mockOnClose}
            />,
        );

        fireEvent.click(screen.getByText('Close'));

        await waitFor(() => {
            expect(mockOnClose).toHaveBeenCalled();
        });
    });
});

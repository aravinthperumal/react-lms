import { fireEvent, renderWithProviders, screen, waitFor } from 'utils/test-utils';

import DeleteDialog from './DeleteDialog';

describe('render Delete Dialog', () => {
    const mockOnDeleteFun = jest.fn();
    const mockOnCloseFun = jest.fn();

    const setup = () => {
        renderWithProviders(
            <DeleteDialog
                title="Delete Dialog"
                label="Are you want to delete"
                onDelete={mockOnDeleteFun}
                onClose={mockOnCloseFun}
            />,
        );
    };

    it('Delete dialog to be in the document', () => {
        setup();
        expect(screen.getByText(/Delete Dialog/i)).toBeInTheDocument();
        expect(screen.getByText(/Are you want to delete/i)).toBeInTheDocument();
    });

    it('Click on close', async () => {
        setup();
        const closeBtn = screen.getByText('Close');

        fireEvent.click(closeBtn);

        await waitFor(() => {
            expect(mockOnCloseFun).toHaveBeenCalledTimes(1);
        });
    });

    it('Click on delete', async () => {
        setup();
        const deleteBtn = screen.getByText('Delete');

        fireEvent.click(deleteBtn);

        await waitFor(() => {
            expect(mockOnDeleteFun).toHaveBeenCalledTimes(1);
        });
    });
});

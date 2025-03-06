import { fireEvent, renderWithProviders, screen } from 'utils/test-utils';

import { BookTakenEntry } from './BookTakenEntry';

describe('Book Taken Entry', () => {
    it('render with correct header text and input elements', () => {
        renderWithProviders(<BookTakenEntry />);

        expect(screen.getByText(/Book Taken Entry/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText('issueDate')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('dueDate')).toBeInTheDocument();
    });

    it('submit form without correct data', async () => {
        renderWithProviders(<BookTakenEntry />);
        fireEvent.click(screen.getByRole('button'));

        expect(await screen.findByText(/Student is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/Book is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/Return date is required/i)).toBeInTheDocument();
    });
});

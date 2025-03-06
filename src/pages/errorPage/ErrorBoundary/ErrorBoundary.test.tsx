import { renderWithProviders, screen } from 'utils/test-utils';

import { ErrorBoundaryCard } from './ErrorBoundaryCard';

describe('Render Error Boundary', () => {
    it('Display Unknown error message', () => {
        renderWithProviders(<ErrorBoundaryCard />);

        expect(screen.getByText('Unknown error')).toBeInTheDocument();
        expect(screen.getByText('Something went wrong. Please try again later.')).toBeInTheDocument();
    });
});

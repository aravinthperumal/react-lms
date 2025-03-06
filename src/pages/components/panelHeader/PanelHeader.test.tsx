import { renderWithProviders, screen } from 'utils/test-utils';

import PanelHeader from './PanelHeader';

describe('PanelHeader', () => {
    it('render the header with text', () => {
        renderWithProviders(<PanelHeader title="Dashboard" />);
        const headerTextElement = screen.getByText(/Dashboard/i);
        expect(headerTextElement).toBeInTheDocument();
    });

    it('render buttons', () => {
        const button = <button>Click me</button>;
        renderWithProviders(<PanelHeader title="Dashboard" buttons={button} />);
        const buttonElement = screen.getByText(/Click me/i);
        expect(buttonElement).toBeInTheDocument();
    });

    it('does not render buttons when buttons are not provided', () => {
        renderWithProviders(<PanelHeader title="Dashboard" />);
        const buttonGroupElement = screen.queryByRole('group');
        expect(buttonGroupElement).not.toBeInTheDocument();
    });
});

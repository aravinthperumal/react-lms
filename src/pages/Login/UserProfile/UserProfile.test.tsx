import { mockUser } from 'test/__mocks__/userMock';

import { fireEvent, renderWithProviders, screen } from 'utils/test-utils';

import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
    const preloadedState = { user: { user: mockUser, error: null, isLoading: false, isUserLoggedIn: true } };
    test('renders user profile with initial values', () => {
        renderWithProviders(<UserProfile />, { preloadedState });

        expect(screen.getByPlaceholderText('name')).toHaveValue(mockUser.name);
        expect(screen.getByPlaceholderText('username')).toHaveValue(mockUser.username);
        expect(screen.getByPlaceholderText('role')).toHaveValue(mockUser.role);
    });

    test('allows user to edit profile', () => {
        const { getByPlaceholderText, getByRole } = renderWithProviders(<UserProfile />, { preloadedState });

        fireEvent.click(getByRole('button', { name: /edit/i }));

        const nameInput = getByPlaceholderText('name');
        fireEvent.change(nameInput, { target: { value: 'Leo' } });

        fireEvent.click(getByRole('button', { name: /save/i }));

        expect(nameInput).toHaveValue('Leo');
    });

    test('displays error message when an error occurs', () => {
        renderWithProviders(<UserProfile />, {
            preloadedState: {
                user: { user: mockUser, error: 'Profile update failed', isLoading: false, isUserLoggedIn: true },
            },
        });

        expect(screen.getByText(/profile update failed/i)).toBeInTheDocument();
    });

    test('cancels editing and resets form', () => {
        const { getByPlaceholderText, getByRole } = renderWithProviders(<UserProfile />, { preloadedState });

        fireEvent.click(getByRole('button', { name: /edit/i }));

        const nameInput = getByPlaceholderText('name');
        fireEvent.change(nameInput, { target: { value: 'Leo' } });

        fireEvent.click(getByRole('button', { name: /cancel/i }));

        expect(nameInput).toHaveValue(mockUser.name);
    });
});

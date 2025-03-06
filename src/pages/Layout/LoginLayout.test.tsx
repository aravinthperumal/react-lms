// LoginLayout.test.tsx
import { screen } from '@testing-library/react';
import { LoginLayout } from 'pages/layout/LoginLayout';
import { Route, Routes } from 'react-router-dom';
import { renderWithProviders } from 'utils/test-utils';
import { User } from 'utils/types';

describe('LoginLayout Component', () => {
    it('navigates to home when user is logged in', () => {
        renderWithProviders(
            <Routes>
                <Route path="/" element={<div>Home Page</div>} />
                <Route element={<LoginLayout />}>
                    <Route path="/login" element={<div>Login Page</div>} />
                </Route>
            </Routes>,
            {
                preloadedState: {
                    user: { isUserLoggedIn: true, user: {} as User },
                },
            },
        );

        expect(screen.getByText('Home Page')).toBeInTheDocument();
    });
});

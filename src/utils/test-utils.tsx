/* eslint-disable react-refresh/only-export-components */
import { render, RenderOptions } from '@testing-library/react';
import React, { JSX, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { AppStore, RootState, setupStore } from '_state/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>;
    store?: AppStore;
}

//as suggested by redux docs creating custom render with providers https://redux.js.org/usage/writing-tests
export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {},
) {
    function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
        return (
            <Provider store={store}>
                <MemoryRouter>{children}</MemoryRouter>
            </Provider>
        );
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
export * from '@testing-library/react'; // Export everything from @testing-library/react

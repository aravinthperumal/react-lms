import { screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { bookData } from 'test/__mocks__/bookListMock';

import { setupStore } from '_state/store';

import { StudentList } from 'pages/studentList/StudentList';

import { renderWithProviders } from 'utils/test-utils';

import { BookList } from './BookList';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BookList', () => {
    it('Book List with initial state', () => {
        renderWithProviders(<BookList />, {
            preloadedState: { book: { bookList: [], isLoading: false } },
        });

        expect(screen.getByText(/Book List/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Search by isbn/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Search by id/i)).toBeInTheDocument();
    });

    it('fetch and displays books', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: bookData });

        const store = setupStore();
        renderWithProviders(<BookList />, { store });

        await waitFor(() => {
            expect(store.getState().book.bookList).toEqual(bookData);
        });

        expect(screen.getByText(/LBOOK0001/i)).toBeInTheDocument();
    });

    it('displays loading while fetching books', async () => {
        mockedAxios.get.mockImplementation(() => new Promise(() => {}));

        renderWithProviders(<StudentList />, {
            preloadedState: { book: { bookList: [], isLoading: true } },
        });

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });
});

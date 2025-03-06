export interface Book {
    id: string;
    title: string;
    author: string;
    category: string;
    isbn: string;
    totalCopies: number;
    availableCopies: number;
}

export interface BookState {
    bookList: Book[];
    isLoading: boolean;
}

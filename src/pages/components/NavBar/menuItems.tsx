export interface MenuItem {
    path: string;
    label: string;
}
export const menuItems: MenuItem[] = [
    {
        path: '/student-list',
        label: 'Student List',
    },
    {
        path: '/book-list',
        label: 'Book List',
    },
    {
        path: '/book-taken-entry',
        label: 'Book Taken Entry',
    },
    {
        path: '/book-return-entry',
        label: 'Book Return Entry',
    },
];

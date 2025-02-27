import { Book } from "pages/bookList/_state/types";
import { Student } from "pages/studentList/_state/types";

export const checkIfStudentExists = (
  students: Student[],
  name: string,
  email: string,
): boolean => {
  return students.some(
    (student) => student.name === name && student.email === email,
  );
};

export const isISBNUnique = (books: Book[], isbn: string) => {
  return !books.some((book) => book.isbn === isbn);
};

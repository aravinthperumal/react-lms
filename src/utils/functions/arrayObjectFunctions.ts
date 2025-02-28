import { Book } from "pages/bookList/_state/types";
import { KeyValue } from "pages/components/dropdown/types";
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

export const selectOptions = <U, T extends U>(
  data: Array<T>,
  labelPropertyName: keyof U,
  valuePropertyName: keyof U,
): KeyValue[] =>
  data.map((option) => ({
    label: option[labelPropertyName] as string,
    value: option[valuePropertyName] as string,
  }));

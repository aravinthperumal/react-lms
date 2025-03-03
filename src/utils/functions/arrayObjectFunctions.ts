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

export const todayDate = (): string => {
  return new Date().toISOString().split("T")[0];
};

export const convertStringToDate = (date: string) => {
  return new Date(date);
};

export const calculatePenalty = (dueDate: string): number => {
  if (!dueDate) return 0;
  const penaltyPerDay = 5;

  const diffTime =
    convertStringToDate(todayDate()).getTime() -
    convertStringToDate(dueDate).getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays * penaltyPerDay : 0;
};

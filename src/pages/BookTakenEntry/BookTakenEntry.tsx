import { useDispatch } from "_state/useDispatch";
import { useSelector } from "_state/useSelector";
import { useFormik } from "formik";
import {
  BOOK_ISSUED,
  EMPTY_VALUE,
  MAX_BOOK_LIMIT,
  NUMBER_ZERO,
} from "globals/constants";
import { issueBook } from "pages/_state/bookTransactionSlice";
import { fetchBooks } from "pages/bookList/_state/bookSlice";
import Button from "pages/components/button/Button";
import { Dropdown } from "pages/components/dropdown/Dropdowm";
import Input from "pages/components/input/Input";
import { fetchStudents } from "pages/studentList/_state/studentSlice";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { selectOptions } from "utils/functions/arrayObjectFunctions";

import { Error, FormContainer, Label } from "./BookTakenEntry.sc";
import { validationSchema } from "./validationSchema";

interface FormFields {
  bookId: string;
  studentId: string;
  issueDate: string;
  dueDate: string;
  returnDate: string | null;
  penalty: number;
  status: string;
}
export const BookTakenEntry: React.FC = () => {
  const dispatch = useDispatch();
  const { bookList } = useSelector((state) => state.book);
  const { studentList } = useSelector((state) => state.student);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchBooks({}));
    dispatch(fetchStudents({}));
  }, [dispatch]);

  const studentOptions = useMemo(
    () => selectOptions(studentList, "name", "id"),
    [studentList],
  );
  const bookOptions = useMemo(
    () => selectOptions(bookList, "title", "id"),
    [bookList],
  );

  const handleSubmit = useCallback(
    (values: FormFields) => {
      dispatch(issueBook(values));
    },
    [dispatch],
  );

  const formik = useFormik<FormFields>({
    initialValues: {
      studentId: EMPTY_VALUE,
      bookId: EMPTY_VALUE,
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: EMPTY_VALUE,
      returnDate: null,
      status: BOOK_ISSUED,
      penalty: NUMBER_ZERO,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      setErrors([]);
      const errors: string[] = [];
      const student = studentList.find(
        (student) => student.id === values.studentId,
      );

      const book = bookList.find((book) => book.id === values.bookId);

      if (book && book.availableCopies <= NUMBER_ZERO) {
        errors.push("Selected book is not available for borrowing.");
      }
      if (student && student?.booksBorrowed.length >= MAX_BOOK_LIMIT) {
        errors.push("Student reached maximum book count");
      }
      if (errors.length > 0) {
        setErrors(errors);
        return;
      }
      handleSubmit(values);
      resetForm();
      toast.info("Book issued successfully");
    },
  });

  return (
    <FormContainer onSubmit={formik.handleSubmit}>
      <h2>{"Book Taken Entry"}</h2>
      <Label>Student</Label>
      <Dropdown
        name="studentId"
        value={formik.values.studentId}
        options={studentOptions}
        onChange={formik.handleChange}
      />
      {formik.touched.studentId && formik.errors.studentId && (
        <Error>{formik.errors.studentId}</Error>
      )}

      <Label>Book</Label>
      <Dropdown
        name="bookId"
        value={formik.values.bookId}
        options={bookOptions}
        onChange={formik.handleChange}
      />
      {formik.touched.bookId && formik.errors.bookId && (
        <Error>{formik.errors.bookId}</Error>
      )}

      <Label>Issue Date</Label>
      <Input
        name="issueDate"
        type="date"
        onChange={formik.handleChange}
        value={formik.values.issueDate}
        isDisabled
      />
      <Label>Last Date To Return</Label>
      <Input
        type="date"
        name="dueDate"
        onChange={formik.handleChange}
        value={formik.values.dueDate}
      />
      {formik.touched.dueDate && formik.errors.dueDate && (
        <Error>{formik.errors.dueDate}</Error>
      )}

      {errors && errors.map((error, i) => <Error key={i}>{error}</Error>)}
      <Button type="submit">Submit</Button>
    </FormContainer>
  );
};

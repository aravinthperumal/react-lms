import { useDispatch } from "_state/useDispatch";
import { useFormik } from "formik";
import { BOOK_RETURNED, EMPTY_VALUE } from "globals/constants";
import Button from "pages/components/button/Button";
import {
  ButtonWrapper,
  CloseButton,
  FormContainer,
  Label,
} from "pages/components/formWrapper/FormWrapper.sc";
import Input from "pages/components/input/Input";
import React, { useCallback } from "react";
import { toast } from "react-toastify";
import {
  calculatePenalty,
  todayDate,
} from "utils/functions/arrayObjectFunctions";

import { returnBook } from "../_state/bookTransactionSlice";
import { BookTransaction } from "../_state/types";

interface BookReturnDialog {
  bookTransaction: BookTransaction;
  onClose: () => void;
}

export const BookReturnDialog: React.FC<BookReturnDialog> = ({
  bookTransaction,
  onClose,
}) => {
  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (data: BookTransaction) => {
      dispatch(returnBook(data));
      toast.info("Book return entry updated");
      onClose();
    },
    [dispatch, onClose],
  );
  const formik = useFormik<BookTransaction>({
    initialValues: {
      bookId: bookTransaction.bookId,
      bookName: bookTransaction.bookName,
      id: bookTransaction.id,
      dueDate: bookTransaction.dueDate,
      issueDate: bookTransaction.issueDate,
      penalty: calculatePenalty(bookTransaction.dueDate),
      returnDate: todayDate(),
      status: BOOK_RETURNED,
      studentId: bookTransaction.studentId,
      studentName: bookTransaction.studentName,
    },
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const { values, handleChange, handleSubmit } = formik;
  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Return Book</h2>
      <Label>Student Name</Label>
      <Input
        onChange={handleChange}
        isDisabled
        placeholder="studentName"
        name={"studentName"}
        value={values.studentName}
      />
      <Label>Book Name</Label>
      <Input
        onChange={handleChange}
        isDisabled
        placeholder="bookName"
        name={"bookName"}
        value={values.bookName}
      />
      <Label>IssueDate Name</Label>
      <Input
        placeholder="issueDate"
        type="date"
        onChange={handleChange}
        isDisabled
        name={"issueDate"}
        value={values.issueDate}
      />
      <Label>Due Date</Label>
      <Input
        type="date"
        onChange={handleChange}
        isDisabled
        placeholder="dueDate"
        name={"dueDate"}
        value={values.dueDate}
      />
      <Label>Actual return date</Label>
      <Input
        type="date"
        onChange={handleChange}
        isDisabled
        placeholder="returnDate"
        name={"returnDate"}
        value={values.returnDate || EMPTY_VALUE}
      />
      <>
        <Label>Late Penalty</Label>
        <Input
          type="text"
          placeholder="penalty"
          onChange={handleChange}
          isDisabled
          name={"penalty"}
          value={values.penalty}
        />
      </>
      <ButtonWrapper>
        <CloseButton type="button" onClick={onClose}>
          Close
        </CloseButton>
        <Button type="submit">{"Confirm Return"}</Button>
      </ButtonWrapper>
    </FormContainer>
  );
};

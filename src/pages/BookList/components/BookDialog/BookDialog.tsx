import { useDispatch } from "_state/useDispatch";
import { useFormik } from "formik";
import { EDIT_MODE, EMPTY_VALUE, NUMBER_ONE } from "globals/constants";
import { addBook, updateBook } from "pages/bookList/_state/bookSlice";
import { Book } from "pages/bookList/_state/types";
import Button from "pages/components/button/Button";
import Input from "pages/components/input/Input";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { isISBNUnique } from "utils/functions/arrayObjectFunctions";

import {
  ButtonWrapper,
  CloseButton,
  Error,
  FormContainer,
  Info,
  Label,
} from "./BookDialog.sc";
import { bookValidationSchema } from "./validationSchema";

interface BookDialogProps {
  bookList: Book[];
  previousBook: Book;
  editMode: EDIT_MODE;
  onClose: () => void;
}

export const BookDialog: React.FC<BookDialogProps> = ({
  editMode,
  bookList,
  onClose,
  previousBook,
}) => {
  const dispatch = useDispatch();
  const isAddMode = editMode === EDIT_MODE.ADD;
  const [error, setError] = useState<string>("");
  const [prevTotalCopies, setPrevTotalCopies] = useState(
    previousBook.totalCopies,
  );

  const handleAddCallback = useCallback(
    (data: Book) => {
      dispatch(addBook(data));
      toast.info("Book added successfully");
      onClose();
    },
    [dispatch, onClose],
  );

  const handleEditCallback = useCallback(
    (data: Book) => {
      dispatch(updateBook(data));
      toast.info("Book updated successfully");
      onClose();
    },
    [dispatch, onClose],
  );

  // to manage total copies decrement limit in edit mode based on previous total and available copies
  const totalCopiesLimit = useMemo(
    () =>
      isAddMode
        ? NUMBER_ONE
        : previousBook.totalCopies - previousBook.availableCopies,
    [isAddMode, previousBook.availableCopies, previousBook.totalCopies],
  );

  const formik = useFormik({
    initialValues: {
      title: previousBook.title ?? EMPTY_VALUE,
      author: previousBook.author ?? EMPTY_VALUE,
      category: previousBook.category ?? EMPTY_VALUE,
      isbn: previousBook.isbn ?? EMPTY_VALUE,
      totalCopies: previousBook.totalCopies ?? NUMBER_ONE,
      availableCopies: previousBook.availableCopies ?? NUMBER_ONE,
      id: previousBook.id,
    },
    validationSchema: bookValidationSchema(totalCopiesLimit),
    onSubmit: (values) => {
      setError("");
      if (isAddMode && !isISBNUnique(bookList, values.isbn)) {
        setError("A book with this ISBN already exists.");
        return;
      }
      return isAddMode ? handleAddCallback(values) : handleEditCallback(values);
    },
  });

  useEffect(() => {
    if (isAddMode) {
      formik.setFieldValue("availableCopies", formik.values.totalCopies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.totalCopies, isAddMode]); //it should be only affected when total copies changed

  useEffect(() => {
    const diff = formik.values.totalCopies - prevTotalCopies;
    if (!isAddMode && diff !== 0) {
      const newAvailableCopies = formik.values.availableCopies + diff;
      formik.setFieldValue("availableCopies", newAvailableCopies);
    }

    // Update to current totalCopies after changed
    setPrevTotalCopies(formik.values.totalCopies);
  }, [formik.values.totalCopies, isAddMode, formik, prevTotalCopies]);

  return (
    <FormContainer onSubmit={formik.handleSubmit}>
      <h2>{isAddMode ? "Add Book" : "Edit Book"}</h2>
      {!isAddMode && (
        <>
          <Label>Id</Label>
          <Input
            isDisabled
            name={"id"}
            value={formik.values.id.toString()}
            onChange={formik.handleChange}
          />
        </>
      )}
      <Label>Title</Label>
      <Input
        name={"title"}
        value={formik.values.title}
        onChange={formik.handleChange}
      />
      {formik.errors.title && formik.touched.title && (
        <Error>{formik.errors.title}</Error>
      )}
      <Label>Author</Label>
      <Input
        name={"author"}
        value={formik.values.author}
        onChange={formik.handleChange}
      />
      {formik.errors.author && formik.touched.author && (
        <Error>{formik.errors.author}</Error>
      )}
      <Label>Category</Label>
      <Input
        name={"category"}
        value={formik.values.category}
        onChange={formik.handleChange}
      />
      {formik.errors.category && formik.touched.category && (
        <Error>{formik.errors.category}</Error>
      )}
      <Label>ISBN</Label>
      <Input
        isDisabled={!isAddMode}
        name={"isbn"}
        value={formik.values.isbn}
        onChange={formik.handleChange}
      />
      {formik.errors.isbn && formik.touched.isbn && (
        <Error>{formik.errors.isbn}</Error>
      )}
      <Label>Total Copies</Label>
      <Input
        name={"totalCopies"}
        type="number"
        value={formik.values.totalCopies}
        onChange={formik.handleChange}
      />
      {formik.errors.totalCopies && formik.touched.totalCopies && (
        <Error>{formik.errors.totalCopies}</Error>
      )}
      <Label>Available Copies</Label>
      <Input
        name={"availableCopies"}
        type="number"
        isDisabled
        value={formik.values.availableCopies}
        onChange={formik.handleChange}
      />
      {formik.errors.availableCopies && formik.touched.availableCopies && (
        <Error>{formik.errors.availableCopies}</Error>
      )}
      <ButtonWrapper>
        <CloseButton type="button" onClick={onClose}>
          Close
        </CloseButton>
        <Button type="submit">{isAddMode ? "Add" : "Save"}</Button>
      </ButtonWrapper>
      {error && <Error>{error}</Error>}
      {!isAddMode && (
        <Info>{`Total number of book copies already in use ${totalCopiesLimit}`}</Info>
      )}
    </FormContainer>
  );
};

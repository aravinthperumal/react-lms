import React, { useCallback, useState } from "react";
import { Student } from "../../_state/types";
import { EDIT_MODE, EMPTY_LIST, EMPTY_VALUE } from "globals/constants";
import { useFormik } from "formik";
import {
  ButtonWrapper,
  CloseButton,
  Error,
  FormContainer,
  Label,
} from "./StudentDialog.sc";
import Button from "pages/components/button/Button";
import Input from "pages/components/input/Input";
import { validationSchema } from "./validationSchema";
import { addStudent, updateStudent } from "../../_state/studentSlice";
import { useDispatch } from "_state/useDispatch";
import { checkIfStudentExists } from "utils/functions/arrayObjectFunctions";
import { toast } from "react-toastify";

interface StudentDialogProps {
  studentList: Student[];
  previousStudent: Student;
  editMode: EDIT_MODE;
  onClose: () => void;
}

export const StudentDialog: React.FC<StudentDialogProps> = ({
  editMode,
  studentList,
  onClose,
  previousStudent,
}) => {
  const dispatch = useDispatch();
  const isAddMode = editMode === EDIT_MODE.ADD;
  const [error, setError] = useState<string>("");

  const handleAddCallback = useCallback(
    (data: Student) => {
      const isAlreadyExist = checkIfStudentExists(
        studentList,
        data.name,
        data.email,
      );
      if (!isAlreadyExist) {
        dispatch(addStudent(data));
        toast.info("Student added successfully");
        onClose();
      } else {
        setError("Student with this name and email already exist");
      }
    },
    [dispatch, onClose, studentList],
  );

  const handleEditCallback = useCallback(
    (data: Student) => {
      dispatch(updateStudent(data));
      toast.info("Student updated successfully");
      onClose();
    },
    [dispatch, onClose],
  );

  const formik = useFormik<Student>({
    initialValues: {
      name: previousStudent.name || EMPTY_VALUE,
      email: previousStudent.email || EMPTY_VALUE,
      department: previousStudent.department || EMPTY_VALUE,
      booksBorrowed: previousStudent.booksBorrowed || EMPTY_LIST,
      id: previousStudent.id,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setError("");
      return isAddMode ? handleAddCallback(values) : handleEditCallback(values);
    },
  });

  return (
    <FormContainer onSubmit={formik.handleSubmit}>
      <h2>{isAddMode ? "Add Student" : "Edit Student"}</h2>
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
      <Label>Name</Label>
      <Input
        name={"name"}
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      {formik.errors.name && formik.touched.name && (
        <Error>{formik.errors.name}</Error>
      )}
      <Label>Email</Label>
      <Input
        name={"email"}
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      {formik.errors.email && formik.touched.email && (
        <Error>{formik.errors.email}</Error>
      )}
      <Label>Department</Label>
      <Input
        name={"department"}
        value={formik.values.department}
        onChange={formik.handleChange}
      />
      {formik.errors.department && formik.touched.department && (
        <Error>{formik.errors.department}</Error>
      )}
      <ButtonWrapper>
        <CloseButton type="button" onClick={onClose}>
          Close
        </CloseButton>
        <Button type="submit">{isAddMode ? "Add" : "Save"}</Button>
      </ButtonWrapper>
      {error && <Error>{error}</Error>}
    </FormContainer>
  );
};

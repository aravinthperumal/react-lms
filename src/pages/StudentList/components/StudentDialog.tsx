import React from "react";
import { Student } from "../_state/types";
import { EDIT_MODE } from "globals/constants";
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

interface StudentDialogProps {
  previousStudent: Student;
  editMode: EDIT_MODE;
  onClose: () => void;
}

export const StudentDialog: React.FC<StudentDialogProps> = ({
  editMode,
  onClose,
  previousStudent,
}) => {
  const formik = useFormik<Student>({
    initialValues: {
      name: previousStudent.name,
      email: previousStudent.email,
      department: previousStudent.department,
      booksBorrowed: previousStudent.booksBorrowed,
      id: previousStudent.id,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // onSubmit(values);
      console.log(values);
    },
  });

  return (
    <FormContainer onSubmit={formik.handleSubmit}>
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
      <ButtonWrapper>
        <CloseButton type="button" onClick={onClose}>
          Close
        </CloseButton>
        <Button type="submit">
          {editMode === EDIT_MODE.ADD ? "Add" : "Save"}
        </Button>
      </ButtonWrapper>
    </FormContainer>
  );
};

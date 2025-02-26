import React, { useCallback } from "react";
import { Student } from "../../_state/types";

import Button from "pages/components/button/Button";
import {
  ButtonWrapper,
  CloseButton,
  FormContainer,
  Label,
} from "./DeleteStudentDialog.sc";
import { useDispatch } from "_state/useDispatch";
import { deleteStudent } from "pages/studentList/_state/studentSlice";
import { toast } from "react-toastify";

interface StudentDialogProps {
  selectedStudent: Student;
  onClose: () => void;
}

export const DeleteStudentDialog: React.FC<StudentDialogProps> = ({
  selectedStudent,
  onClose,
}) => {
  const dispatch = useDispatch();
  const handleDelete = useCallback(() => {
    dispatch(deleteStudent(selectedStudent.id));
    toast.info("Student deleted successfully");
    onClose();
  }, [dispatch, onClose, selectedStudent.id]);

  return (
    <FormContainer>
      <h2>Delete Student</h2>
      {<Label>{"Are you sure want to delete this student ?"}</Label>}
      <ButtonWrapper>
        <CloseButton type="button" onClick={onClose}>
          Close
        </CloseButton>
        <Button onClick={handleDelete}>{"Delete"}</Button>
      </ButtonWrapper>
    </FormContainer>
  );
};

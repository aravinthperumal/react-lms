import React, { useCallback } from "react";
import { Student } from "../../_state/types";
import { useDispatch } from "_state/useDispatch";
import { deleteStudent } from "pages/studentList/_state/studentSlice";
import { toast } from "react-toastify";
import DeleteDialog from "pages/components/deleteDialog/DeleteDialog";

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
    <DeleteDialog
      label="Are you sure want to delete this student ?"
      onClose={onClose}
      onDelete={handleDelete}
      title="Delete student"
    />
  );
};

import Button from "pages/components/button/Button";
import React, { useCallback } from "react";

import {
  ButtonWrapper,
  CloseButton,
  FormContainer,
  Label,
} from "../formWrapper/FormWrapper.sc";

interface DeleteDialogProps {
  onClose: () => void;
  onDelete: () => void;
  title: string;
  label: string;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({
  label,
  onClose,
  onDelete,
  title,
}) => {
  const handleDelete = useCallback(() => {
    onDelete();
    onClose();
  }, [onDelete, onClose]);

  return (
    <FormContainer>
      <h2>{title}</h2>
      <Label>{label}</Label>
      <ButtonWrapper>
        <CloseButton type="button" onClick={onClose}>
          Close
        </CloseButton>
        <Button onClick={handleDelete}>Delete</Button>
      </ButtonWrapper>
    </FormContainer>
  );
};

export default DeleteDialog;

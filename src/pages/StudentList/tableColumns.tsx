import Button from "pages/components/button/Button";
import { TableButtonWrapper } from "pages/components/formWrapper/FormWrapper.sc";
import { Column } from "pages/components/table/Table";

import { Student } from "./_state/types";

export interface ExtendedStudent extends Student {
  actions?: string; //for button action accessor to avoid list key error
}

export const studentColumns = (
  onEdit: (student: Student) => void,
  onDelete: (student: Student) => void,
): Column<ExtendedStudent>[] => [
  { id: "id", label: "Id" },
  { id: "name", label: "Name" },
  { id: "department", label: "Department" },
  { id: "email", label: "Email" },
  {
    id: "booksBorrowed",
    label: "Borrowed Books",
    render: (row) => row.booksBorrowed.length,
  },
  {
    id: "actions",
    render: (row) => (
      <TableButtonWrapper>
        <Button onClick={() => onEdit(row)}>Edit</Button>
        <Button onClick={() => onDelete(row)}>Delete</Button>
      </TableButtonWrapper>
    ),
  },
];

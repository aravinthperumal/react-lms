import { Column } from "pages/components/table/Table";
import { Student } from "./_state/types";

export const studentColumns: Column<Student>[] = [
  { id: "id", label: "Id" },
  { id: "name", label: "Name" },
  { id: "department", label: "Department" },
  {
    id: "booksBorrowed",
    label: "Borrowed Books",
    render: (row) => row.booksBorrowed.length,
  },
];

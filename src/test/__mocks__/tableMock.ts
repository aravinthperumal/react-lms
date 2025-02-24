import { Column } from "pages/components/table/Table";

export interface TableData {
  id: number;
  firstName: string;
  lastName: string;
}

export const columns: Column<TableData>[] = [
  { id: "id", label: "Id" },
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
];

export const rows: TableData[] = [
  {
    id: 1,
    firstName: "test1 fname",
    lastName: "test1 lname",
  },
  {
    id: 2,
    firstName: "test2 fname",
    lastName: "test2 lname",
  },
  {
    id: 3,
    firstName: "test3 fname",
    lastName: "test3 lname",
  },
  {
    id: 4,
    firstName: "test4 fname",
    lastName: "test4 lname",
  },
  {
    id: 5,
    firstName: "test5 fname",
    lastName: "test5 lname",
  },
  {
    id: 6,
    firstName: "test6 fname",
    lastName: "test6 lname",
  },
];

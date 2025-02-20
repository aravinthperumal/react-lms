import { Column } from "pages/components/table/Table";
import { Book } from "./_state/types";

export const bookColumns: Column<Book>[] = [
  { id: "id", label: "Id" },
  { id: "title", label: "Title" },
  { id: "author", label: "Author" },
  { id: "category", label: "Category" },
  { id: "isbn", label: "ISBN Number" },
  { id: "totalCopies", label: "Total copies" },
  { id: "availableCopies", label: "Available copies" },
];

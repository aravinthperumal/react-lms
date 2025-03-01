import { useDispatch } from "_state/useDispatch";
import { useSelector } from "_state/useSelector";
import { ADMIN, EDIT_MODE, LOCALSTORAGE_USER_ROLE } from "globals/constants";
import Button from "pages/components/button/Button";
import Modal from "pages/components/modal/Modal";
import PanelHeader from "pages/components/panelHeader/PanelHeader";
import SearchBar, { FilterDef } from "pages/components/searchBar/SearchBar";
import Table from "pages/components/table/Table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getFromLocalStorage } from "utils/localStorage/localStorage";

import { fetchBooks } from "./_state/bookSlice";
import { Book } from "./_state/types";
import { BookDialog } from "./components/BookDialog/BookDialog";
import { DeleteBookDialog } from "./components/DeleteBookDialog/DeleteBookDialog";
import { bookColumns } from "./tableColumns";

const filters: FilterDef[] = [
  { key: "title", placeholder: "Search by title" },
  { key: "id", placeholder: "Search by id" },
  { key: "isbn", placeholder: "Search by isbn" },
  { key: "author", placeholder: "Search by author" },
];

export const BookList: React.FC = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const isAdmin = getFromLocalStorage(LOCALSTORAGE_USER_ROLE) === ADMIN;
  const { bookList, isLoading } = useSelector((state) => state.book);
  const [selectedBook, setSelectedBook] = useState<Book>({} as Book);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openBookDialog, setOpenBookDialog] = useState(false);
  const [editMode, setEditMode] = useState(EDIT_MODE.ADD);

  const searchParamsObj = useMemo(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  useEffect(() => {
    dispatch(fetchBooks(searchParamsObj));
  }, [dispatch, searchParams, searchParamsObj]);

  const onAdd = useCallback(() => {
    setOpenBookDialog(true);
    setSelectedBook({} as Book);
    setEditMode(EDIT_MODE.ADD);
  }, []);

  const onEdit = useCallback((row: Book) => {
    setOpenBookDialog(true);
    setSelectedBook(row);
    setEditMode(EDIT_MODE.EDIT);
  }, []);

  const onCloseBookDialog = useCallback(() => {
    setOpenBookDialog(false);
    setSelectedBook({} as Book);
  }, []);

  const onDelete = useCallback((book: Book) => {
    if (book.availableCopies < book.totalCopies) {
      toast.error("Book in use", { position: "top-right" });
    } else {
      setOpenDeleteDialog(true);
      setSelectedBook(book);
    }
  }, []);

  const onCloseDeleteDialog = useCallback(() => {
    setOpenDeleteDialog(false);
    setSelectedBook({} as Book);
  }, []);

  return (
    <>
      <PanelHeader
        title="Book List"
        buttons={isAdmin && <Button onClick={onAdd}>{"Add Book"}</Button>}
      />
      <SearchBar filters={filters} />
      <Table
        loading={isLoading}
        columns={bookColumns(onEdit, onDelete, isAdmin)}
        rows={bookList}
      />
      <Modal isOpen={openDeleteDialog}>
        <DeleteBookDialog
          onClose={onCloseDeleteDialog}
          selectedBook={selectedBook}
        />
      </Modal>
      <Modal isOpen={openBookDialog}>
        <BookDialog
          bookList={bookList}
          editMode={editMode}
          previousBook={selectedBook}
          onClose={onCloseBookDialog}
        />
      </Modal>
    </>
  );
};

import { useDispatch } from "_state/useDispatch";
import { useSelector } from "_state/useSelector";
import Table from "pages/components/table/Table";
import { useEffect } from "react";
import { fetchBooks } from "./_state/bookSlice";
import { bookColumns } from "./tableColumns";

export const BookList: React.FC = () => {
  const { bookList, isLoading } = useSelector((state) => state.book);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <>
      <h2>Book List</h2>
      <Table loading={isLoading} columns={bookColumns} rows={bookList} />
    </>
  );
};

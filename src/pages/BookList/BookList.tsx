import { useDispatch } from "_state/useDispatch";
import { useSelector } from "_state/useSelector";
import Table from "pages/components/table/Table";
import { useEffect } from "react";
import { fetchBooks } from "./_state/bookSlice";
import { bookColumns } from "./tableColumns";
import SearchBar, { FilterDef } from "pages/components/SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";

const filters: FilterDef[] = [
  { key: "title", placeholder: "Search by title" },
  { key: "id", placeholder: "Search by id" },
  { key: "isbn", placeholder: "Search by isbn" },
  { key: "author", placeholder: "Search by author" },
];

export const BookList: React.FC = () => {
  const { bookList, isLoading } = useSelector((state) => state.book);
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const searchParamsObj: Record<string, string> = {};
    Array.from(searchParams.entries()).forEach(([key, value]) => {
      searchParamsObj[key] = value;
    });
    dispatch(fetchBooks(searchParamsObj));
  }, [dispatch, searchParams]);

  return (
    <>
      <h2>Book List</h2>
      <SearchBar filters={filters} />
      <Table loading={isLoading} columns={bookColumns} rows={bookList} />
    </>
  );
};

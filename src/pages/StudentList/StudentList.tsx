import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "_state/useSelector";
import { useDispatch } from "_state/useDispatch";
import Table from "pages/components/table/Table";
import SearchBar, { FilterDef } from "pages/components/searchBar/SearchBar";
import { studentColumns } from "./tableColumns";
import { fetchStudents } from "./_state/studentSlice";

const filters: FilterDef[] = [
  { key: "name", placeholder: "Search by name" },
  { key: "id", placeholder: "Search by id" },
];

export const StudentList: React.FC = () => {
  const { isLoading, studentList } = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  //extract params from router search params
  const searchParamsObj = useMemo(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  useEffect(() => {
    dispatch(fetchStudents(searchParamsObj));
  }, [dispatch, searchParamsObj]);

  return (
    <>
      <h2>Student List</h2>
      <SearchBar filters={filters} />
      <Table loading={isLoading} rows={studentList} columns={studentColumns} />
    </>
  );
};

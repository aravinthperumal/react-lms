import { useSelector } from "_state/useSelector";
import Table from "pages/components/table/Table";
import { studentColumns } from "./tableColumns";
import { useDispatch } from "_state/useDispatch";
import { useEffect, useMemo } from "react";
import { fetchStudents } from "./_state/studentSlice";
import SearchBar, { FilterDef } from "pages/components/SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";

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

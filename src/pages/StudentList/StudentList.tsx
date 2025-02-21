import { useSelector } from "_state/useSelector";
import Table from "pages/components/table/Table";
import { studentColumns } from "./tableColumns";
import { useDispatch } from "_state/useDispatch";
import { useEffect } from "react";
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

  useEffect(() => {
    const searchParamsObj: Record<string, string> = {};
    //extract params from router search params
    Array.from(searchParams.entries()).forEach(([key, value]) => {
      searchParamsObj[key] = value;
    });

    dispatch(fetchStudents(searchParamsObj));
  }, [dispatch, searchParams]);

  return (
    <>
      <h2>Student List</h2>
      <SearchBar filters={filters} />
      <Table loading={isLoading} rows={studentList} columns={studentColumns} />
    </>
  );
};

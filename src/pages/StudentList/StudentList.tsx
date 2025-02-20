import { useSelector } from "_state/useSelector";
import Table from "pages/components/table/Table";
import { studentColumns } from "./tableColumns";
import { useDispatch } from "_state/useDispatch";
import { useEffect } from "react";
import { fetchStudents } from "./_state/studentSlice";

export const StudentList: React.FC = () => {
  const { isLoading, studentList } = useSelector((state) => state.student);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <>
      <h2>Student Lists</h2>
      <Table loading={isLoading} rows={studentList} columns={studentColumns} />
    </>
  );
};

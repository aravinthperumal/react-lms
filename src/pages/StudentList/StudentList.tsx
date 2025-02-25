import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "_state/useSelector";
import { useDispatch } from "_state/useDispatch";
import Table from "pages/components/table/Table";
import SearchBar, { FilterDef } from "pages/components/searchBar/SearchBar";
import { studentColumns } from "./tableColumns";
import { fetchStudents } from "./_state/studentSlice";
import PanelHeader from "pages/components/panelHeader/PanelHeader";
import Button from "pages/components/button/Button";
import Modal from "pages/components/modal/Modal";
import { StudentDialog } from "./components/StudentDialog";
import { Student } from "./_state/types";
import { EDIT_MODE } from "globals/constants";

const filters: FilterDef[] = [
  { key: "name", placeholder: "Search by name" },
  { key: "id", placeholder: "Search by id" },
];

export const StudentList: React.FC = () => {
  const { isLoading, studentList } = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [openStudentDialog, setOpenStudentDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({} as Student);

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

  const onAddCallback = useCallback(() => {
    setOpenStudentDialog(true);
  }, []);

  const onCloseStudentDialog = useCallback(() => {
    setOpenStudentDialog(false);
    setSelectedStudent({} as Student);
  }, []);

  return (
    <>
      <PanelHeader
        title="Student List"
        buttons={<Button onClick={onAddCallback}>{"Add Student"}</Button>}
      />
      <SearchBar filters={filters} />
      <Table loading={isLoading} rows={studentList} columns={studentColumns} />

      <Modal isOpen={openStudentDialog}>
        <StudentDialog
          editMode={EDIT_MODE.ADD}
          onClose={onCloseStudentDialog}
          previousStudent={selectedStudent}
        />
      </Modal>
    </>
  );
};

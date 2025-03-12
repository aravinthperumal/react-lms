import { useDispatch } from '_state/useDispatch';
import { useSelector } from '_state/useSelector';
import { EDIT_MODE } from 'globals/constants';
import Button from 'pages/components/button/Button';
import Modal from 'pages/components/modal/Modal';
import PanelHeader from 'pages/components/panelHeader/PanelHeader';
import SearchBar, { FilterDef } from 'pages/components/searchBar/SearchBar';
import Table from 'pages/components/table/Table';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sanitizeAndValidateFilters } from 'utils/functions/validationFunctions';

import { fetchStudents } from './_state/studentSlice';
import { Student } from './_state/types';
import { DeleteStudentDialog } from './DeleteStudentDialog/DeleteStudentDialog';
import { StudentDialog } from './StudentDialog/StudentDialog';
import { studentColumns } from './tableColumns';

const filters: FilterDef[] = [
    {
        key: 'name',
        placeholder: 'Search by name',
    },
    {
        key: 'id',
        placeholder: 'Search by id',
    },
];

export const StudentList: React.FC = () => {
    const { isLoading, studentList } = useSelector((state) => state.student);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [openStudentDialog, setOpenStudentDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [editMode, setEditMode] = useState(EDIT_MODE.ADD);

    //extract params from router search params
    const searchParamsObj = useMemo(() => {
        const params: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
        return sanitizeAndValidateFilters(params);
    }, [searchParams]);

    useEffect(() => {
        dispatch(fetchStudents(searchParamsObj));
    }, [dispatch, searchParamsObj]);

    const onAdd = useCallback(() => {
        setOpenStudentDialog(true);
        setSelectedStudent(null);
        setEditMode(EDIT_MODE.ADD);
    }, []);

    const onEdit = useCallback((row: Student) => {
        setOpenStudentDialog(true);
        setSelectedStudent(row);
        setEditMode(EDIT_MODE.EDIT);
    }, []);

    const onCloseStudentDialog = useCallback(() => {
        setOpenStudentDialog(false);
        setSelectedStudent(null);
    }, []);

    const onDelete = useCallback((student: Student) => {
        if (student.booksBorrowed.length > 0) {
            toast.error('Student has borrowed books', { position: 'top-right' });
        } else {
            setOpenDeleteDialog(true);
            setSelectedStudent(student);
        }
    }, []);

    const onCloseDeleteDialog = useCallback(() => {
        setOpenDeleteDialog(false);
        setSelectedStudent(null);
    }, []);
    return (
        <>
            <PanelHeader title="Student List" buttons={<Button onClick={onAdd}>{'Add Student'}</Button>} />
            <SearchBar filters={filters} />
            <Table loading={isLoading} rows={studentList} columns={studentColumns(onEdit, onDelete)} />

            <Modal isOpen={openStudentDialog}>
                <StudentDialog
                    studentList={studentList}
                    editMode={editMode}
                    onClose={onCloseStudentDialog}
                    previousStudent={selectedStudent}
                />
            </Modal>
            <Modal isOpen={openDeleteDialog}>
                <DeleteStudentDialog onClose={onCloseDeleteDialog} selectedStudent={selectedStudent} />
            </Modal>
        </>
    );
};

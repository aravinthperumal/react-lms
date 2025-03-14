import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useDispatch } from '_state/useDispatch';
import { useSelector } from '_state/useSelector';

import Modal from 'pages/components/modal/Modal';
import PanelHeader from 'pages/components/panelHeader/PanelHeader';
import SearchBar, { FilterDef } from 'pages/components/searchBar/SearchBar';
import Table from 'pages/components/table/Table';

import { fetchBookTransaction } from './_state/bookTransactionSlice';
import { BookTransaction } from './_state/types';
import { BookReturnDialog } from './BookReturnDialog/BookReturnDialog';
import { transactionsColumns } from './tableColumns';

const filters: FilterDef[] = [{ key: 'studentId', placeholder: 'Search by student id' }];
export const BookReturnEntry: React.FC = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const { transaction, isLoading } = useSelector((state) => state.bookTransaction);
    const [selectedTransaction, setSelectedTransaction] = useState<BookTransaction | null>(null);
    const [openReturnDialog, setOpenReturnDialog] = useState(false);

    const searchParamsObj = useMemo(() => {
        const params: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
        return params;
    }, [searchParams]);

    const handleReturnCallback = useCallback((data: BookTransaction) => {
        setOpenReturnDialog(true);
        setSelectedTransaction(data);
    }, []);

    useEffect(() => {
        dispatch(fetchBookTransaction(searchParamsObj));
    }, [dispatch, searchParams, searchParamsObj]);

    const handleClose = useCallback(() => {
        setOpenReturnDialog(false);
        setSelectedTransaction(null);
    }, []);
    return (
        <>
            <PanelHeader title="Book Return Entry" />
            <SearchBar filters={filters} />
            <Table loading={isLoading} rows={transaction} columns={transactionsColumns(handleReturnCallback)} />
            <Modal isOpen={openReturnDialog}>
                <BookReturnDialog bookTransaction={selectedTransaction} onClose={handleClose} />
            </Modal>
        </>
    );
};
//

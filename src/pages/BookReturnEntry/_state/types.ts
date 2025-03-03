export interface BookTransaction {
  id: string;
  bookId: string;
  bookName: string;
  studentId: string;
  studentName: string;
  issueDate: string;
  dueDate: string;
  returnDate: string | null;
  penalty: number;
  status: string;
}

export interface BookTransactionState {
  isLoading: boolean;
  transaction: BookTransaction[];
}

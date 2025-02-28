export interface BootTransaction {
  id: string;
  bookId: string;
  studentId: string;
  issueDate: string;
  dueDate: string;
  returnDate: string | null;
  penalty: number;
  status: string;
}

export interface BootTransactionState {
  isLoading: boolean;
  transaction: BootTransaction[];
}

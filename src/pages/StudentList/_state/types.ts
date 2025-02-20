export interface Student {
  id: number;
  name: string;
  department: string;
  booksBorrowed: string[];
}

export interface StudentState {
  studentList: Student[];
  isLoading: boolean;
}

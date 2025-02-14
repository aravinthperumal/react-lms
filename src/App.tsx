import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { StudentList } from "./pages/studentList/StudentList";
import { BookList } from "./pages/bookList/BookList";
import { BookReturnEntry } from "./pages/bookReturnEntry/BookReturnEntry";
import { BookTakenEntry } from "./pages/bookTakenEntry/BookTakenEntry";
import { FunctionComponent } from "react";
import Login from "pages/login/Login";
import { NotFoundPage } from "pages/errorPage/NotFoundPage";
import { Protected } from "pages/layout/Protected";

export const App: FunctionComponent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/student-list"} />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Protected />}>
          <Route index path="/student-list" element={<StudentList />} />
          <Route path="/book-list" element={<BookList />} />
          <Route path="/book-return-entry" element={<BookReturnEntry />} />
          <Route path="/book-taken-entry" element={<BookTakenEntry />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;

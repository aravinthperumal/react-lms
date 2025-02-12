import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { StudentList } from "./pages/StudentList/StudentList";
import { BookList } from "./pages/BookList/BookList";
import { Login } from "./pages/Login/Login";
import { BookReturnEntry } from "./pages/BookReturnEntry/BookReturnEntry";
import { BookTakenEntry } from "./pages/BookTakenEntry/BookTakenEntry";
import { FunctionComponent } from "react";
import { BasePageLayout } from "./pages/Layout/BasePageLayout";
import { NotFoundPage } from "./pages/NotFoundPage";

export const App: FunctionComponent = () => {
  const isUserLoggedIn = true;

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/student-list"} />} />
        <Route path="/login" element={<Login />} />
        <Route
          element={
            isUserLoggedIn ? <BasePageLayout /> : <Navigate to={"/login"} />
          }
        >
          <Route path="/student-list" element={<StudentList />} />
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

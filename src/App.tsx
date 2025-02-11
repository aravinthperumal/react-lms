import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { StudentList } from "./pages/StudentList/StudentList";
import { BookList } from "./pages/BookList/BookList";
import { Login } from "./pages/Login/Login";
import { BookReturnEntry } from "./pages/BookReturnEntry/BookReturnEntry";
import { BookTakenEntry } from "./pages/BookTakenEntry/BookTakenEntry";
import { FunctionComponent } from "react";

export const App:FunctionComponent=()=> {
  return (
    <>
      <Routes>
        {/*need to implement route protection with auth*/}
        <Route path="/" element={<Navigate to={'/login'}/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/student-list" element={<StudentList/>}/>
        <Route path="/book-list" element={<BookList/>}/>
        <Route path="/book-return-entry" element={<BookReturnEntry/>}/>
        <Route path="/book-taken-entry" element={<BookTakenEntry/>}/>
      </Routes>
    </>
  );
}

export default App;
 
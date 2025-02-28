import * as Yup from "yup";

export const validationSchema = Yup.object({
  studentId: Yup.string().required("Student is required"),
  bookId: Yup.string().required("Book is required"),
  dueDate: Yup.string()
    .required("Return date is required")
    .test(
      "is-after-issue-date",
      "Return date must be after issue date",
      function (value) {
        const { issueDate } = this.parent;
        return new Date(value) > new Date(issueDate);
      },
    ),
});

import ExpensesRegister from "@/modules/expenses/views/Register";
import ExpenseList from "@/modules/expenses/views/List";

export default [
  {
    path: "/",
    name: "expense-list",
    component: ExpenseList,
  },
  {
    path: "/new",
    name: "expense-form",
    component: ExpensesRegister,
  },
];

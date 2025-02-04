import Signin from "@/modules/auth/views/Signin";

export default [
  {
    path: "/signin",
    name: "signin",
    component: Signin,
    meta: {
      layout: "auth",
      requiresAuth: false,
    },
  },
];

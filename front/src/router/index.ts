import { createWebHistory, createRouter } from "vue-router";
import { useAuthStore } from "@/modules/auth/store";

import AuthModule from "@/modules/auth/router";
import ExpensesModule from "@/modules/expenses/router";

import NotFound from "@/views/NotFound";

const router = createRouter({
  history: createWebHistory(),
  base: import.meta.env.BASE_URL,
  linkActiveClass: "active",
  scrollBehavior() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0, behavior: "smooth" });
      });
    });
  },
  routes: [
    ...AuthModule,
    ...ExpensesModule,
    {
      path: "/:catchAll(.*)",
      redirect: "/pagina-nao-encontrada",
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/pagina-nao-encontrada",
      component: NotFound,
      meta: {
        layout: "default",
        requiresAuth: false,
      },
    },
  ],
});

router.beforeEach((to, _, next) => {
  const store = useAuthStore();
  to.meta.requiresAuth && !store.signedIn ? next("/signin") : next();
  next();
});

export default router;

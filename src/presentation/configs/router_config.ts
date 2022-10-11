import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("~/presentation/pages/Entry.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// todo:
// user role 切換 router
export default router;

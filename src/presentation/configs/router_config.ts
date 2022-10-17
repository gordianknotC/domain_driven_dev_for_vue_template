import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { ERouter } from "../consts/router_const";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/splash",
    name: ERouter.splash,
    component: () => import("~/presentation/pages/SplashPage.vue")
  },
  {
    path: "/signin",
    name: ERouter.signin,
    component: () => import("~/presentation/pages/SigninPage.vue")
  },
  {
    path: "/",
    name: ERouter.homelayout,
    component: () => import("~/presentation/layout/HomeLayout.vue"),
    children: [
      {
        path: "",
        name: ERouter.homelayout,
        redirect: { name: ERouter.merhantList }
      },
      {
        path: "/merchant-list",
        name: ERouter.merhantList,
        component: () => import("~/presentation/pages/MerchantListPage.vue")
      },
      {
        path: "/material-list",
        name: ERouter.merhantList,
        component: () => import("~/presentation/pages/MaterialListPage.vue")
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// todo:
// user role 切換 router
export default router;

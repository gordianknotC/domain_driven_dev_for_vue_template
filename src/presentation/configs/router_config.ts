import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { ERouter } from "../consts/router_const";
import { ADMIN_GROUP } from "../consts/ua_const";
import {
  QueryStringPreprocessorGuard,
  RouterGuardImpl
} from "../controller/router/impls/router_guard_impl";

function applyAdminMetaIfNotSpecified(
  routes: RouteRecordRaw[],
  defaults = ADMIN_GROUP.all
): RouteRecordRaw[] {
  routes.forEach(r => {
    if (r.meta?.admin == undefined) {
      r.meta ??= {};
      r.meta.admin = defaults;
    }
    if ((r.children?.length ?? 0) >= 1) {
      applyAdminMetaIfNotSpecified(r.children!, defaults);
    }
  });
  return routes;
}

/** 沒有註明 meta.admin 代表 all */
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
        component: () => import("~/presentation/pages/MerchantListPage.vue"),
        meta: {
          admin: ADMIN_GROUP.all
        }
      },
      {
        path: "/material-list",
        name: ERouter.merhantList,
        component: () => import("~/presentation/pages/MaterialListPage.vue"),
        meta: {
          admin: ADMIN_GROUP.all
        }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: applyAdminMetaIfNotSpecified(routes, ADMIN_GROUP.all)
});

// const rotuerGuard = new RouterGuardImpl(
//   [new QueryStringPreprocessorGuard(
//     router
//   )],
//   []
// );

router.beforeEach((to, from, next) => {});

// todo:
// user role 切換 router
export default router;

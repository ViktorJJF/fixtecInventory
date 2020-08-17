import Vue from "vue";
import Router from "vue-router";
import store from "./store";

Vue.use(Router);

let routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("./views/authPages/login.vue"),
  },
  {
    path: "/",
    component: () => import("@/layouts/admin.vue"),
    meta: {
      requiresAuth: true,
    },
    name: "dashboard",
    redirect: {
      name: "statistics",
    },
    children: [
      {
        path: "/estadisticas",
        name: "statistics",
        component: () => import("@/views/drawerPages/statistics.vue"),
      },
      {
        path: "/marcas",
        name: "brand",
        component: () => import("@/views/drawerPages/brands.vue"),
      },
      {
        path: "/calidades",
        name: "qualities",
        component: () => import("@/views/drawerPages/qualities.vue"),
      },
      {
        path: "/tipos",
        name: "type",
        component: () => import("@/views/drawerPages/types.vue"),
      },
      {
        path: "/tipos-de-inversiones",
        name: "toolsTypes",
        component: () => import("@/views/drawerPages/toolsTypes.vue"),
      },
      {
        path: "/colores",
        name: "colors",
        component: () => import("@/views/drawerPages/colors.vue"),
      },
      {
        path: "/productos/crear",
        name: "addProduct",
        component: () => import("@/views/drawerPages/addProduct.vue"),
      },
      {
        path: "/productos/listado",
        name: "listProduct",
        component: () => import("@/views/drawerPages/inventory.vue"),
      },
      {
        path: "/servicios",
        name: "services",
        component: () => import("@/views/drawerPages/services.vue"),
      },
      {
        path: "/ventas/crear",
        name: "addSale",
        component: () => import("@/views/drawerPages/addSale.vue"),
      },
      {
        path: "/ventas/historial",
        name: "salesHistory",
        component: () => import("@/views/drawerPages/salesHistory.vue"),
      },
      {
        path: "/perfil-usuario",
        name: "userProfile",
        component: () => import("@/views/drawerPages/userProfile.vue"),
      },
      {
        path: "/compras/crear",
        name: "addPurchase",
        component: () => import("@/views/drawerPages/addPurchase.vue"),
      },
      {
        path: "/compras/historial",
        name: "historyPurchase",
        component: () => import("@/views/drawerPages/historyPurchase.vue"),
      },
      {
        path: "/inversiones",
        name: "tools",
        component: () => import("@/views/drawerPages/tools.vue"),
      },
      {
        path: "/ganancias-diarias",
        name: "reportDailyRevenue",
        component: () => import("@/views/drawerPages/reportDailyRevenue.vue"),
      },
      {
        path: "/ganancias-por-producto",
        name: "reportRevenuePerProduct",
        component: () =>
          import("@/views/drawerPages/reportRevenuePerProduct.vue"),
      },
      {
        path: "/reporte-de-compras",
        name: "ReportPurchases",
        component: () => import("@/views/drawerPages/ReportPurchases.vue"),
      },
    ],
  },
  {
    path: "*",
    component: () => import("@/components/common/notFound.vue"),
  },
];

const router = new Router({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  // checkForUpdates();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isTokenSet = store.getters["authModule/isTokenSet"];
  if (requiresAuth && !isTokenSet) {
    return next({ name: "login" });
  }
  // checkIfTokenNeedsRefresh();
  // store.commit("successModule/success", null);
  // store.commit("errorModule/error", null);
  return next();
});

export default router;

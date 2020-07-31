import Vue from "vue";
import Router from "vue-router";
import store from "./store";

Vue.use(Router);

let routes = [
  {
    path: "/",
    component: () => import("@/layouts/home"),
    meta: {
      guest: true,
    },
    children: [
      {
        path: "",
        redirect: "/login",
      },
      {
        path: "/login",
        name: "login",
        component: () => import("./views/authPages/login.vue"),
      },
    ],
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
        path: "/tipos",
        name: "type",
        component: () => import("@/views/drawerPages/types.vue"),
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
        path: "/ventas/crear",
        name: "addOrder",
        component: () => import("@/views/drawerPages/addSale.vue"),
      },
      {
        path: "/ventas/historial",
        name: "orderHistory",
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
    ],
  },
];

const router = new Router({
  routes,
  mode: "history",
});

router.beforeEach(async (to, from, next) => {
  if (!store.state.user) {
    store.state.user = JSON.parse(localStorage.getItem("user"));
    store.state.token = JSON.parse(localStorage.getItem("token"));
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.user) {
      next({
        name: "login",
        params: {
          nextUrl: to.fullPath,
        },
      });
    } else {
      let user = store.state.user;
      if (to.matched.some((record) => record.meta.requiresAuth)) {
        console.log("aea alpaca");
        if (user.role == "ADMIN") {
          next();
        } else {
          next({
            name: "dashboard",
          });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (store.state.user == null) {
      next();
    } else {
      next({
        name: "dashboard",
      });
    }
  } else {
    next();
  }
});

export default router;

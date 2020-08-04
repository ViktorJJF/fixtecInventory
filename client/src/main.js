import Vue from "vue";
import "./plugins/vuetify";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// Importing the global css file
import "@/assets/css/customStyles.css";
// GLobal components
import "./views/globalComponents/globalComponents";

// global axios
import "./bootstrap";

// styles
import "./styles/styles.scss";

//vee validate
import "./plugins/vee-validate";

//vue chartist
import "chartist/dist/chartist.min.css";
Vue.use(require("vue-chartist"));

Vue.config.productionTip = false;

import Chartist from "chartist";
Vue.prototype.$Chartist = Chartist;

//plugins
import "@/plugins/deepCopy";
import "@/plugins/vee-validate";
import "@/plugins/axios";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import VuetifyConfirm from "vuetify-confirm";
Vue.use(VuetifyConfirm, {
  vuetify,
  buttonTrueText: "Aceptar",
  buttonFalseText: "Cancelar",
  color: "error",
  icon: "mdi-alert-circle-outline",
  title: "Advertencia",
  width: 350,
  property: "$confirm",
  buttonTrueColor: "red lighten3",
  // buttonFalseColor: "yellow lighten3"
});

new Vue({
  vuetify,
  router,
  data: {
    Chartist: Chartist,
  },
  store,
  created() {
    console.log(store.getters["authModule/isTokenSet"]);
    if (store.getters["authModule/isTokenSet"]) {
      store.dispatch("authModule/autoLogin");
    }
  },
  render: (h) => h(App),
}).$mount("#app");

import Vue from "vue";
import currencyFormatter from "currency-formatter";
Vue.filter("formatMoney", (value) => {
  if (!value && value !== 0) return "Sin moneda";
  return currencyFormatter.format(value, { code: "PE" });
});

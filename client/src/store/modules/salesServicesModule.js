import api from "@/services/api/salesServices";
import { buildSuccess, handleError } from "@/utils/utils.js";

const module = {
  namespaced: true,
  state: {
    salesServices: [],
    total: 0,
    totalPages: 0,
  },
  actions: {
    list({ commit }, query) {
      return new Promise((resolve, reject) => {
        api
          .list(query)
          .then((response) => {
            commit("list", response.data.payload);
            commit("totalItems", response.data.totalDocs);
            commit("totalPages", response.data.totalPages);
            resolve(response.data.payload);
          })
          .catch((error) => {
            handleError(error, commit, reject);
          });
      });
    },
    listWithProducts({ commit, rootGetters }, query) {
      return new Promise((resolve, reject) => {
        api
          .listWithProducts(query)
          .then((response) => {
            let salesServices = response.data.payload;
            // populate
            const productById = rootGetters["productsModule/productById"];
            //populate with products
            for (let i = 0; i < salesServices.length; i++) {
              for (let j = 0; j < salesServices[i].products.length; j++) {
                salesServices[i].products[j].productId = productById(
                  salesServices[i].products[j].productId
                );
              }
            }
            commit("list", salesServices);
            commit("totalItems", response.data.totalDocs);
            commit("totalPages", response.data.totalPages);
            resolve(salesServices);
          })
          .catch((error) => {
            handleError(error, commit, reject);
          });
      });
    },
    create({ commit }, data) {
      return new Promise((resolve, reject) => {
        api
          .create(data)
          .then((res) => {
            commit("loadingModule/showLoading", true, { root: true });
            buildSuccess("Venta creada con éxito", commit);
            commit("create", res.data.payload);
            resolve(res.data.payload);
          })
          .catch((error) => {
            handleError(error, commit, reject);
          });
      });
    },
    update({ commit }, { id, data }) {
      return new Promise((resolve, reject) => {
        api
          .update(id, data)
          .then((res) => {
            commit("loadingModule/showLoading", true, { root: true });
            buildSuccess("Registro actualizado con éxito", commit);
            commit("update", {
              id,
              data: res.data.payload,
            });
            resolve(res.data.payload);
          })
          .catch((error) => {
            handleError(error, commit, reject);
          });
      });
    },
    delete({ commit }, id) {
      return new Promise((resolve, reject) => {
        api
          .delete(id)
          .then(() => {
            commit("loadingModule/showLoading", true, { root: true });
            buildSuccess("Venta eliminada con éxito", commit);
            commit("delete", id);
            resolve();
          })
          .catch((error) => {
            handleError(error, commit, reject);
          });
      });
    },
  },
  mutations: {
    list(state, data) {
      state.salesServices = data;
    },
    totalItems(state, data) {
      state.total = data;
    },
    totalPages(state, data) {
      state.totalPages = data;
    },
    create(state, data) {
      state.salesServices.push(data);
    },
    update(state, { id, data }) {
      let indexToUpdate = state.salesServices.findIndex(
        (member) => member._id == id
      );
      state.salesServices.splice(indexToUpdate, 1, {
        ...data,
      });
    },
    delete(state, id) {
      let indexToDelete = state.salesServices.findIndex(
        (member) => member._id == id
      );
      console.log("se eliminara este: ", id, indexToDelete);
      state.salesServices.splice(indexToDelete, 1);
    },
  },
  getters: {},
};

export default module;

import api from "@/services/api/purchases";
import { buildSuccess, handleError } from "@/utils/utils.js";

const module = {
  namespaced: true,
  state: {
    purchases: [],
    totalPurchases: 0,
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
    listWithProducts({ commit }, query) {
      return new Promise((resolve, reject) => {
        api
          .listWithProducts(query)
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
      state.purchases = data;
    },
    totalItems(state, data) {
      state.totalPurchases = data;
    },
    totalPages(state, data) {
      state.totalPages = data;
    },
    create(state, data) {
      state.purchases.push(data);
    },
    update(state, { id, data }) {
      let indexToUpdate = state.purchases.findIndex(
        (member) => member._id == id
      );
      state.purchases.splice(indexToUpdate, 1, {
        ...data,
      });
    },
    delete(state, id) {
      let indexToDelete = state.purchases.findIndex(
        (member) => member._id == id
      );
      state.purchases.splice(indexToDelete, 1);
    },
  },
  getters: {},
};

export default module;
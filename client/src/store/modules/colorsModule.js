import api from "@/services/api/colors";
import { buildSuccess, handleError } from "@/utils/utils.js";

const module = {
  namespaced: true,
  state: {
    colors: [],
  },
  actions: {
    list({ commit }, query) {
      return new Promise((resolve, reject) => {
        api
          .list(query)
          .then((response) => {
            commit("list", response.data.payload);
            resolve(response.data.payload.reverse());
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
            let data = res.data.payload;
            commit("loadingModule/showLoading", true, { root: true });
            buildSuccess("Registro guardado con éxito", commit, resolve);
            commit("create", data);
            resolve();
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
            let data = res.data.payload;
            commit("loadingModule/showLoading", true, { root: true });
            buildSuccess("Registro guardado con éxito", commit, resolve);
            commit("update", {
              id,
              data,
            });
            resolve();
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
            buildSuccess("Registro eliminado con éxito", commit, resolve);
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
      state.colors = data;
    },
    create(state, data) {
      state.colors.push(data);
    },
    update(state, { id, data }) {
      let indexToUpdate = state.colors.findIndex((member) => member._id == id);
      state.colors.splice(indexToUpdate, 1, {
        ...data,
      });
    },
    delete(state, id) {
      let indexToDelete = state.colors.findIndex((member) => member._id == id);
      state.colors.splice(indexToDelete, 1);
    },
  },
  getters: {},
};

export default module;
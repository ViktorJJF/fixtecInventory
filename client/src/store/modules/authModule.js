import api from "@/services/api/auth";
// import apiUsers from "@/services/api/users";
import { buildSuccess, handleError } from "@/utils/utils.js";

const state = () => ({
  user: localStorage.getItem("user") || null,
  token: localStorage.getItem("token") || null,
});

const getters = {
  user: (state) =>
    state.user ? state.user.first_name + " " + state.user.last_name : " ",
  token: (state) => (state.user ? state.user.token : " "),
};
const actions = {
  initialLoad({ commit }) {
    if (process.browser) {
      commit("initialLoad");
    }
  },
  login({ commit }, { email, password }) {
    return new Promise((resolve, reject) => {
      console.log("empezando login");
      api
        .login(email, password)
        .then((res) => {
          let data = res.data;
          //   commit("loadingModule/showLoading", true, { root: true });
          buildSuccess("Bienvenido", commit, resolve);
          console.log("inicio correcto", data);
          localStorage.setItem("token", JSON.stringify(data.token));
          localStorage.setItem("user", JSON.stringify(data.user));
          commit("login", data.user);
          resolve();
        })
        .catch((error) => {
          handleError(error, commit, reject);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      api
        .logout()
        .then(() => {
          localStorage.removeItem("token");
          commit("logout");
          resolve();
        })
        .catch((error) => {
          handleError(error, commit, reject);
        });
    });
  },
  // editUser({ commit }, { id, data }) {
  //   return new Promise((resolve, reject) => {
  //     commit("loadingModule/showLoading", true, { root: true });
  //     apiUsers
  //       .editMember(id, data)
  //       .then((res) => {
  //         let data = res.data.payload;
  //         buildSuccess("Registro guardado con éxito", commit, resolve);
  //         commit("editUser", data);
  //         resolve();
  //       })
  //       .catch((error) => {
  //         handleError(error, commit, reject);
  //       });
  //   });
  // },
};
const mutations = {
  login(state, data) {
    state.user = data;
  },
  logout(state) {
    state.user = null;
    state.token = null;
  },
  editUser(state, data) {
    state.user = data;
  },
  initialLoad(state) {
    state.user = JSON.parse(localStorage.getItem("user"));
    state.token = JSON.parse(localStorage.getItem("token"));
  },
};

const namespaced = true;

export default { getters, actions, mutations, state, namespaced };

import { createStore } from "vuex";

// export default createStore({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {},
// });

import axios from "axios";

// Create a new store axios.
const store = createStore({
  state: {
    status: "",
    user: null,
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, payload) {
      axios.defaults.headers.common["Authorization"] = payload.token;
      localStorage.setItem("token", payload.token);
      state.user = payload.user;
    },
    setUser: function (state, userInfos) {
      state.user = userInfos;
    },
    logout: function (state) {
      state.user = null;
      localStorage.removeItem("token");
      window.location.href = "/";
    },
  },
  actions: {
    init: (context) => {
      return new Promise((resolve, reject) => {
        if (localStorage.token && context.state.user == null) {
          axios.defaults.headers.common["Authorization"] = localStorage.token;
          axios
            .get("/user/profile")
            .then((res) => {
              context.commit("setUser", res.data);
              resolve(res.data);
            })
            .catch((error) => {
              console.log(error);
              resolve(null);
            });
        } else {
          resolve(context.state.user);
        }
      });
    },

    login: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        axios
          .post("/user/login", userInfos)
          .then(function (response) {
            commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_login");
            reject(error);
          });
      });
    },
    createAccount: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        commit;
        axios
          .post("/user/signup", userInfos)
          .then(function (response) {
            commit("setStatus", "created");
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_create");
            reject(error);
          });
      });
    },
    getUserInfos: ({ commit }) => {
      axios
        .post("/profile")
        .then(function (response) {
          commit("userInfos", response.data.infos);
        })
        .catch(function () {});
    },
  },
});

export default store;

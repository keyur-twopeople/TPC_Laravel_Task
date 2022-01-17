import axios from "axios";
import router from "../../routes";

const state = {
    user: null
};
const getters = {
    isLogged: state => !!state.user
};
const mutations = {
    setUserData(state, userData) {
        state.user = userData;
        localStorage.setItem("user", JSON.stringify(userData));
        axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
    },

    clearUserData() {
        localStorage.removeItem("user");
    }
};
const actions = {
    login({ commit }, credentials) {
        axios
            .post("/login", credentials)
            .then(({ data }) => {
                commit("setUserData", data);
                if(data.user.role == "shop") {
                    router.push({ path: "/shop" });
                } else {
                    router.push({ path: "/products" });
                }
            })
            .catch(err => {
                console.log(err);
            });
    },

    logout({ commit }) {
        commit("clearUserData");
        router.push({ path: "/" });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};

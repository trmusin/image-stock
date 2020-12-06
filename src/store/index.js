import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        favorites: {},
        history: [],
    },
    mutations: {
        SET_FAVORITES(state, payload) {
            state.favorites = payload;
        },
        SET_HISTORY(state, payload) {
            state.history = payload;
        },

        SET_FAVORITES_ITEM(state, payload) {
            let newFavorites = {...state.favorites};
            if(newFavorites[payload.id]){
                delete newFavorites[payload.id]
            } else {
                let time = Date.now();
                newFavorites[payload.id] = {...payload, createDate: time}
            }
            state.favorites = newFavorites;
            localStorage.setItem("favorites", JSON.stringify(newFavorites))
        },
        SET_HISTORY_ITEM(state, payload) {
            state.history.unshift(payload);
            localStorage.setItem("history", JSON.stringify(state.history))
        },
    },
    getters: {
        getFavorites: (state) => {
            return state.favorites
        },
        getHistory: (state) => {
            return state.history
        },
    },
    actions: {

    },
});

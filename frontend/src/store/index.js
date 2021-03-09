import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        stateMovies: []
    },
    mutations: {
        GET_MOVIES: (state, payload) => {
            state.stateMovies = payload
        }
    },
    actions: {
        searchMovies({ commit }, keywords) {
            axios.get(`https://us-central1-fajar-movies.cloudfunctions.net/movies?keywords=${keywords}`)
                .then((result) => {
                    console.log(result)
                    console.log(commit);
                    commit('GET_MOVIES', result.data.data)
                }).catch((err) => {
                    console.log(err)
                });
        }
    },
    modules: {}
})
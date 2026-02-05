import { createStore } from "vuex"

export default createStore({
	state: {
		user: null
	},
	getters: {
		isLoggedIn: state => !!state.user,
		userRoles: state => state.user?.roles || []
	},
	mutations: {
		SET_USER(state, user) {
			state.user = user
		},
		LOGOUT(state) {
			state.user = null
		}
	},
	actions: {
		login({ commit }, user) {
			commit('SET_USER', user)
		},
		logout({ commit }) {
			commit('LOGOUT')
		}
	},
	modules: {}
})

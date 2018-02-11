import Vue from 'vue'
import * as action from './sprints-actions'
import * as mutation from './sprints-mutations'

const state = {
	all: [],
	current: {}
};

const getters = {}

const actions = {

	[action.FETCH_CURRENT]({ commit }) {
		const url = `/api/sprint/current`;
		return Vue.http.get(`${url}`)
			.then(res => {
				const sprint = res.body;
				commit(mutation.SET_CURRENT, sprint);
			});
	},

	[action.FETCH_ALL]({ commit }) {
		const url = `/api/sprint/all`;
		return Vue.http.get(`${url}`)
			.then(res => {
				const sprints = res.body;
				commit(mutation.SET_ALL, sprints);
			});
	}
};

const mutations = {

	[mutation.SET_CURRENT] (state, sprint) {
		Vue.set(state, 'current', sprint);
	},

	[mutation.SET_ALL] (state, sprints) {
		Vue.set(state, 'all', sprints);
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
	namespaced: true
}
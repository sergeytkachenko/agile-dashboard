import Vue from 'vue'
import * as mutation from './groups-mutations'
import * as action from './groups-actions'


const state = {
	all: {
		'id1': {
			id: 'group1',
			name: 'DEV'
		},
		'id2': {
			id: 'group2',
			name: 'TESTING'
		},
		'id3': {
			id: 'group3',
			name: 'CODE REVIEW'
		},
		'id4': {
			id: 'group4',
			name: 'DONE'
		}
	}
}

const getters = {

	groups: state => {
		return Object.values(state.all);
	}
}

const actions = {
	[action.FETCH_ALL] ({ commit }) {
		const url = `/api/group/all`;
		return Vue.http.get(`${url}`)
			.then(res => {
				const groups = res.body;
				commit(mutation.SET_ALL_FROM_ARRAY, groups)
			});
	}
};

const mutations = {

	[mutation.SET_GROUPS] (state, { groups }) {
		Vue.set(state, 'all', groups);
	},

	[mutation.SET_ALL_FROM_ARRAY] (state, groups) {
		const obj = {};
		groups.forEach(group => {
			obj[group.id] = group;
		});
		Vue.set(state, 'all', obj);
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
	namespaced: true
}
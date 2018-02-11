import * as types from '../mutation-types'
import Vue from 'vue'

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

}

const mutations = {

	[types.SET_GROUPS] (state, { groups }) {
		Vue.set(state, 'all', groups);
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
	namespaced: true
}